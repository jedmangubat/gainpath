# vendor/

Third-party scripts GainPath loads **on demand** (never at startup), served from
the app's own origin instead of a CDN. They are the exact files the app used to
load from cdnjs / jsDelivr: each was checked against the `sha384` integrity value
that `index.html` carried, and they match byte for byte.

| File | Library | Version | Licence | sha384 |
|---|---|---|---|---|
| `chart-4.4.1.min.js` | Chart.js | 4.4.1 | MIT | `bs/nf9FbdNouRbMiFcrcZfLXYPKiPaGVGplVbv7dLGECccEXDW+S3zjqSKR5ZEaD` |
| `jspdf-2.5.1.min.js` | jsPDF | 2.5.1 | MIT | `JcnsjUPPylna1s1fvi1u12X5qjY5OL56iySh75FdtrwhO/SWXgMjoVqcKyIIWOLk` |
| `emailjs-browser-4.4.1.min.js` | @emailjs/browser | 4.4.1 | BSD-3-Clause | `SALc35EccAf6RzGw4iNsyj7kTPr33K7RoGzYu+7heZhT8s0GZouafRiCg1qy44AS` |

- Loaded by `loadLib(name)` in `js/ui-core.js` the first time they are needed
  (Climb charts, the monthly PDF, the feedback form).
- Precached by `sw.js` (`LIB_URLS`) so they work offline.
- File names carry the version, so a cached copy is never stale. To upgrade a
  library, add the new file, point `LIBS` in `js/ui-core.js` and `LIB_URLS` in
  `sw.js` at it, bump `CACHE_NAME`, and delete the old file.
- To re-verify a file: `openssl dgst -sha384 -binary <file> | openssl base64 -A`.
