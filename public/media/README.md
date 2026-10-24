# Bundled media

Five binaries referenced by the design source live here. They could not be
pulled through the Claude Design API (it caps file reads at 256 KB), so copy
them in from the design project export:

| File                    | Used by                                            |
| ----------------------- | -------------------------------------------------- |
| `hero.mp4`              | Home hero — plays over the still once it buffers    |
| `first-whistle.webp`    | Home "Built before the first whistle"; Journey      |
| `journey-pitch.png`     | Journey hero                                        |
| `journey-phoenix.png`   | Journey "Phoenix" portrait                          |
| `stadium.webp`          | Journey "They help create it"                       |

Until they are present, every slot falls back to the published photograph on
bluephoenixfc.com (see `MEDIA` in `lib/site.ts`), so nothing renders blank.
