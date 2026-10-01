#!/usr/bin/env python3
"""Post to the GainPath Fitness Facebook Page through the Graph API.

Dev tooling only: never touches index.html. Every write is a DRY RUN that prints
exactly what would be sent unless --yes is passed, so nothing goes public by
accident (posts and replies are draft-then-approve, one at a time).

  fb_post.py check                              verify the token + Page access (read-only)
  fb_post.py post --message-file F [--photo P | --video V [--title T]] [--link URL] [--schedule WHEN] [--yes]
  fb_post.py get POST_ID                        re-fetch a post (read-only)
  fb_post.py delete POST_ID [--yes]

--schedule takes an ISO time ("2026-09-24T19:30", local tz unless it has an
offset) between 10 minutes and 75 days ahead; the post is created unpublished
and Facebook publishes it at that time.

Implementation notes (why it shells out to curl): the python.org Python on this
Mac ships no CA bundle, so urllib fails TLS verification. curl uses the macOS
trust store, and its `-K -` config on stdin keeps the token out of argv and
the URL. Captions go through curl's form-string so `;` and `@` are not
interpreted (curl -F truncates at `;`). The token lives in the macOS Keychain
(service gainpath.facebook-system-user-token, account gainpath; save it with
`sh secrets/save.sh`); this script never prints it.
"""
import argparse, datetime as dt, json, os, subprocess, sys

VERSION = "v26.0"  # Graph API; v19/v20 are expired or expiring, Meta silently reroutes old versions
PAGE_ID = "1360573253802118"  # GainPath Fitness (the Graph id, not the number in the profile.php URL)
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KEYCHAIN_SERVICE, KEYCHAIN_ACCOUNT = "gainpath.facebook-system-user-token", "gainpath"
BASE = f"https://graph.facebook.com/{VERSION}"
VIDEO_BASE = f"https://graph-video.facebook.com/{VERSION}"  # video uploads must go to this host


def q(s):
    """Quote for a curl config-file string."""
    return '"' + (s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")
                  .replace("\r", "\\r").replace("\t", "\\t")) + '"'


def call(method, path, token, fields=None, files=None, params=None, base=BASE, max_time=120):
    """One Graph call. Returns parsed JSON; raises SystemExit with Graph's message on error."""
    url = f"{base}/{path}"
    if params:
        url += "?" + "&".join(f"{k}={v}" for k, v in params.items())
    cfg = [f"url = {q(url)}", "silent", f"max-time = {max_time}", f"header = {q('Authorization: Bearer ' + token)}"]
    if method != "GET":
        cfg.append(f"request = {q(method)}")
    for k, v in (fields or {}).items():
        cfg.append(f"form-string = {q(f'{k}={v}')}")
    for k, v in (files or {}).items():
        cfg.append(f"form = {q(f'{k}=@{v}')}")
    out = subprocess.run(["curl", "-K", "-"], input="\n".join(cfg), capture_output=True, text=True)
    try:
        data = json.loads(out.stdout)
    except ValueError:
        sys.exit(f"Non-JSON response from Graph (curl exit {out.returncode}): {out.stderr.strip()[:200] or out.stdout[:200]}")
    if isinstance(data, dict) and "error" in data:
        e = data["error"]
        sys.exit(f"Graph error {e.get('code')}/{e.get('error_subcode')}: {e.get('message')}")
    return data


def system_token():
    """Read the system-user token from the macOS Keychain (captured, never printed)."""
    r = subprocess.run(["security", "find-generic-password", "-a", KEYCHAIN_ACCOUNT, "-s", KEYCHAIN_SERVICE, "-w"],
                       capture_output=True, text=True)
    tok = r.stdout.strip()
    if r.returncode != 0 or not tok:
        sys.exit("No token in the Keychain (service %s). Click Copy on the token in Meta, then run: sh secrets/save.sh" % KEYCHAIN_SERVICE)
    return tok


def tokens():
    sys_tok = system_token()
    # The system-user token alone fails with (#210) "A page access token is required".
    return call("GET", PAGE_ID, sys_tok, params={"fields": "access_token"})["access_token"]


def parse_when(s):
    t = dt.datetime.fromisoformat(s)
    if t.tzinfo is None:
        t = t.astimezone()  # naive = this machine's local timezone
    now = dt.datetime.now(dt.timezone.utc)
    if not (now + dt.timedelta(minutes=10) <= t <= now + dt.timedelta(days=75)):
        sys.exit("--schedule must be between 10 minutes and 75 days from now.")
    return int(t.timestamp()), t


def show(post_id, page_token):
    d = call("GET", post_id, page_token, params={"fields": "message,story,created_time,is_published,scheduled_publish_time,permalink_url,full_picture"})
    print(json.dumps(d, ensure_ascii=False, indent=2))
    return d


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("check")
    p = sub.add_parser("post")
    p.add_argument("--message-file", required=True)
    p.add_argument("--photo")
    p.add_argument("--video", help="mp4 to upload; the caption goes in the video description")
    p.add_argument("--title", help="video title (optional)")
    p.add_argument("--link")
    p.add_argument("--schedule")
    p.add_argument("--yes", action="store_true", help="actually send (default is a dry run)")
    g = sub.add_parser("get"); g.add_argument("post_id")
    d = sub.add_parser("delete"); d.add_argument("post_id"); d.add_argument("--yes", action="store_true")
    a = ap.parse_args()

    pt = tokens()
    if a.cmd == "check":
        info = call("GET", PAGE_ID, pt, params={"fields": "name,category,link,fan_count"})
        feed = call("GET", f"{PAGE_ID}/feed", pt, params={"fields": "id,message,story,created_time", "limit": 5})
        sched = call("GET", f"{PAGE_ID}/scheduled_posts", pt, params={"fields": "id,message,scheduled_publish_time", "limit": 5})
        print(json.dumps({"page": info, "recent_posts": feed.get("data"), "scheduled": sched.get("data")}, ensure_ascii=False, indent=2))
    elif a.cmd == "get":
        show(a.post_id, pt)
    elif a.cmd == "delete":
        if not a.yes:
            print(f"DRY RUN: would DELETE {a.post_id}. Re-run with --yes."); return
        print(call("DELETE", a.post_id, pt))
    elif a.cmd == "post":
        message = open(a.message_file, encoding="utf-8").read().strip()
        if a.photo and a.video:
            sys.exit("Use --photo or --video, not both.")
        for f in (a.photo, a.video):
            if f and not os.path.isfile(f):
                sys.exit(f"File not found: {f}")
        fields, files = {"message": message}, {}
        when = None
        if a.schedule:
            ts, when = parse_when(a.schedule)
            fields.update(published="false", scheduled_publish_time=str(ts))
        if a.video:
            # A video object's caption field is `description`, not `message`.
            fields["description"] = fields.pop("message")
            if a.title:
                fields["title"] = a.title
            path, files = f"{PAGE_ID}/videos", {"source": a.video}
        elif a.photo:
            path, files = f"{PAGE_ID}/photos", {"source": a.photo}
        else:
            path = f"{PAGE_ID}/feed"
            if a.link:
                fields["link"] = a.link
        print("=" * 60)
        print(f"{'PUBLISH NOW' if not when else 'SCHEDULE for ' + when.isoformat()}  ->  GainPath Fitness ({PAGE_ID})")
        print(f"endpoint: /{path}   photo: {a.photo or '-'}   video: {a.video or '-'}   link: {a.link or '-'}")
        if a.title:
            print(f"title: {a.title}")
        print("-" * 60); print(message); print("=" * 60)
        if not a.yes:
            print("DRY RUN: nothing sent. Re-run with --yes after approval."); return
        if a.video:
            res = call("POST", path, pt, fields=fields, files=files, base=VIDEO_BASE, max_time=900)
            print("Graph response:", res)
            # The upload returns the video id; the feed post appears once Facebook publishes it.
            print(json.dumps(call("GET", res["id"], pt, params={"fields": "title,description,published,scheduled_publish_time,permalink_url,status"}), ensure_ascii=False, indent=2))
            return
        res = call("POST", path, pt, fields=fields, files=files)
        print("Graph response:", res)
        # Verify by re-fetching what Facebook stored. A photo call returns the *photo* id (no `message`
        # field on a photo object); the feed post that carries the caption is <page>_<photo id>.
        show(res.get("post_id") or (f"{PAGE_ID}_{res['id']}" if a.photo else res["id"]), pt)


if __name__ == "__main__":
    main()
