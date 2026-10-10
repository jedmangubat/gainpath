# GainPath brag soundtrack: 120 BPM, Am–F–C–G, SFX in key, one mix. → audio.wav
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
import wave

SR = 44100; DUR = 22.0; N = int(SR * DUR)
BEAT = 0.5
rng = np.random.default_rng(7)
def buf(): return np.zeros(N)
def hz(m): return 440 * 2 ** ((m - 69) / 12)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'band', fs=SR, output='sos'), x)
def add(dst, sig, t0, g=1.0):
    i = int(t0 * SR)
    if i >= N: return
    j = min(N, i + len(sig)); dst[i:j] += g * sig[:j - i]
def env(n, a, d):  # attack secs, exp decay time constant secs
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)

# chords (midi): A minor, F, C, G   (voiced around C4)
CH = {'Am': [57, 60, 64, 69], 'F': [53, 57, 60, 65], 'C': [55, 60, 64, 67], 'G': [55, 59, 62, 67]}
ROOT = {'Am': 45, 'F': 41, 'C': 48, 'G': 43}
def chord_at(t):
    if t >= 19.0: return 'C'
    return ['Am', 'F', 'C', 'G'][int(t // 2) % 4]

pad, bass, kick, hat, snare, pluck, sfx = (buf() for _ in range(7))

# --- pad: detuned saw-ish stacks, lowpassed; swells in
def padnote(m, n):
    t = np.arange(n) / SR; s = np.zeros(n)
    for det in (-0.08, 0, 0.08):
        f = hz(m + det)
        for h in range(1, 6): s += np.sin(2 * np.pi * f * h * t + rng.random() * 6) / h ** 1.3
    return s
for b in range(11):
    t0 = b * 2.0; name = chord_at(t0 + 0.01)
    n = int(2.4 * SR); s = sum(padnote(m, n) for m in CH[name])
    e = np.minimum(1, np.arange(n) / (0.35 * SR)) * np.minimum(1, (n - np.arange(n)) / (0.4 * SR))
    add(pad, s * e, t0 - 0.2 if b else 0)
# final chord rings to the end
n = int(3.0 * SR); s = sum(padnote(m, n) for m in CH['C'] + [72])
add(pad, s * np.minimum(1, np.arange(n) / (0.5 * SR)), 19.0, 0.6)
pad = lp(pad, 1600) * 0.05
pad *= np.clip(np.linspace(0, 1, N) * 8, 0.5, 1)  # quieter during the first seconds

# --- groove 3.0 → 21.0 (kick/hat/snare), breaks for the outro text beats
def kicks():
    n = int(0.35 * SR); t = np.arange(n) / SR
    f = 45 + 80 * np.exp(-t / 0.04); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / 0.12)
K = kicks()
H = hp(rng.standard_normal(int(0.06 * SR)), 7000) * env(int(0.06 * SR), 0.001, 0.018)
def snr():
    n = int(0.25 * SR); t = np.arange(n) / SR
    return bp(rng.standard_normal(n), 1200, 6000) * np.exp(-t / 0.06) * 0.6 + np.sin(2 * np.pi * 190 * t) * np.exp(-t / 0.05) * 0.4
SN = snr()
t = 3.0
while t < 21.0 - 1e-6:
    beat = int(round((t - 3.0) / BEAT))
    quiet = 16.0 <= t < 16.5
    if not quiet:
        add(kick, K, t)
        add(hat, H, t + BEAT / 2, 0.9)
        if beat % 2 == 1: add(snare, SN, t)
        if beat % 4 == 3: add(hat, H, t + BEAT * 0.75, 0.5)
    t += BEAT
# hook: one low boom under "77.5kg"
add(kick, K * 0.85, 1.5)

# --- bass: root 8ths from 3.0, sidechained feel via envelope
def bassnote(m, n):
    t = np.arange(n) / SR; f = hz(m)
    s = np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t) + 0.12 * np.sin(6 * np.pi * f * t)
    return s * np.minimum(1, t / 0.02) * np.exp(-t / 0.3)
t = 3.0
while t < 21.0 - 1e-6:
    if not (16.0 <= t < 16.5):
        add(bass, bassnote(ROOT[chord_at(t)], int(0.26 * SR)), t)
    t += BEAT / 2
add(bass, bassnote(ROOT['Am'] - 12, int(1.2 * SR)) * 0.9, 1.5)  # hook sub
add(bass, bassnote(36, int(2.5 * SR)), 21.0, 1.0)  # final low C
bass = lp(bass, 400) * 0.30

# --- pluck arpeggio (8ths) from the reveal
def plucknote(m, n, bright=1.0):
    t = np.arange(n) / SR; f = hz(m)
    s = sum(np.sin(2 * np.pi * f * h * t) * (0.55 ** (h - 1)) * np.exp(-t * h * 6 * bright) for h in range(1, 6))
    return s * np.minimum(1, t / 0.003) * np.exp(-t / 0.25)
t = 3.0; k = 0
while t < 19.0 - 1e-6:
    if not (16.0 <= t < 16.5):
        notes = CH[chord_at(t)] + [CH[chord_at(t)][1] + 12]
        add(pluck, plucknote(notes[[0, 2, 1, 3, 4, 3, 2, 1][k % 8]] + 12, int(0.4 * SR)), t, 0.8 if k % 2 == 0 else 0.55)
    t += BEAT / 2; k += 1
pluck = lp(pluck, 5000) * 0.09

# --- SFX (in key, soft)
# typing ticks under the typed question: pitched, very soft
for i in range(0, 21, 2):
    tt = 0.25 + i / 21 * 1.0
    add(sfx, plucknote(81 + (i % 4 == 0) * 3, int(0.08 * SR), 3.0), tt, 0.10)
# "77.5kg" slam: chord hit
for m in CH['Am'] + [76]: add(sfx, plucknote(m + 12, int(1.0 * SR), 0.6), 1.5, 0.16)
# taps: soft plucks on chord tones
for tt in (6.85, 8.0, 8.62, 11.45):
    ch = CH[chord_at(tt)]
    add(sfx, plucknote(ch[3] + 12, int(0.35 * SR)), tt, 0.30)
    add(sfx, plucknote(ch[2] + 12, int(0.35 * SR)), tt + 0.03, 0.18)
# whooshes: filtered noise swells
def whoosh(dur, lo, hi):
    n = int(dur * SR); x = rng.standard_normal(n); out = np.zeros(n); seg = 1024
    for s0 in range(0, n, seg):
        fr = s0 / n; c = lo * (hi / lo) ** fr
        out[s0:s0 + seg] = bp(x[max(0, s0 - 2048):s0 + seg], c * 0.7, min(c * 1.4, SR / 2 - 100))[-len(x[s0:s0 + seg]):]
    e = np.sin(np.pi * np.linspace(0, 1, n)) ** 2
    return out * e
add(sfx, whoosh(0.55, 300, 3000), 2.55, 0.35)   # into reveal
add(sfx, whoosh(0.35, 500, 2500), 9.85, 0.18)   # screen push
add(sfx, whoosh(0.35, 500, 2500), 13.3, 0.18)   # screen push
add(sfx, whoosh(0.5, 3000, 300), 16.0, 0.3)     # phones out
add(sfx, whoosh(0.5, 300, 3500), 18.6, 0.3)     # into logo
# outro line hits: kick + chord stab per line
for tt, ch in ((16.6, 'Am'), (17.1, 'F'), (17.6, 'G')):
    for m in CH[ch]: add(sfx, plucknote(m + 12, int(0.6 * SR), 0.8), tt, 0.13)
# logo bloom
for m in CH['C'] + [72, 76]: add(sfx, plucknote(m + 12, int(2.5 * SR), 0.35), 19.35, 0.12)

# --- reverb send
ir_n = int(1.2 * SR); ir = rng.standard_normal(ir_n) * np.exp(-np.arange(ir_n) / (0.35 * SR))
ir = lp(ir, 5000); ir /= np.sqrt(np.sum(ir ** 2))
def verb(x, wet): return x + wet * fftconvolve(x, ir)[:N]

# sidechain duck for pad/pluck on kicks (from 3.0)
duck = np.ones(N)
t = 3.0
while t < 21.0:
    if not (16.0 <= t < 16.5):
        i = int(t * SR); n = int(0.22 * SR)
        duck[i:i + n] = np.minimum(duck[i:i + n], 0.55 + 0.45 * (np.arange(min(n, N - i)) / n))
    t += BEAT

mix_mono = (verb(pad, 0.25) * duck + verb(pluck, 0.35) * duck + bass + kick * 0.55 + hp(hat, 5000) * 0.10
            + verb(snare, 0.3) * 0.16 + verb(sfx, 0.4) * 0.8)
# light stereo: pluck/sfx/hat widened with small delays
def dly(x, ms): d = int(ms / 1000 * SR); return np.concatenate([np.zeros(d), x[:-d]])
L = mix_mono + 0.04 * dly(verb(pluck, 0.3), 11) + 0.03 * dly(hat, 7)
R = mix_mono + 0.04 * dly(verb(pluck, 0.3), 17) + 0.03 * dly(sfx, 9)
st = np.stack([L, R], 1)
# master: gentle glue, fade in/out
st = np.tanh(st * 1.3) / 1.3
fade = np.ones(N); fi = int(0.05 * SR); fo = int(0.9 * SR)
fade[:fi] = np.linspace(0, 1, fi); fade[-fo:] = np.linspace(1, 0, fo) ** 1.5
st *= fade[:, None]
st *= 0.89 / np.max(np.abs(st))
with wave.open('audio.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((st * 32767).astype(np.int16).tobytes())
print('peak', np.max(np.abs(st)), 'rms dB', 20 * np.log10(np.sqrt(np.mean(st ** 2))))
