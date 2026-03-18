# Opgave 1 – Byg din verden


---

## Inden du går i gang

Du skal bruge:
- Dit Phaser-projekt fra opsætningsguiden (kørende i browseren)
- Et tileset fra [kenney.nl](https://kenney.nl/assets) som du har lyst til at arbejde med
- Tilemap Vieweren (jakobs-tilemap-viewer.html) til at finde frame-numre

---

## Trin 1 – Find et tileset du kan lide

Gå på [kenney.nl/assets](https://kenney.nl/assets) og find et **2D tileset** du synes ser fedt ud.

Det kan fx være:
- Tiny Dungeon (dungeon/RPG)
- Roguelike/RPG Pack
- Tiny Town (by/top-down)
- Eller noget helt andet — bare det er 2D og PNG

> **Vigtigt:** Sørg for at pakken indeholder `.png`-filer. Hvis den kun indeholder `.fbx` eller `.obj` er det 3D og virker ikke i Phaser.

Download og udpak zip-filen.

---

## Trin 2 – Læg tilesettet i dit projekt

Find `.png`-filen i den udpakkede mappe. Det hedder typisk noget som `tilemap.png`, `tilemap_packed.png` eller navnet på pakken.

Kopier filen til:

```
public/
└── assets/
    └── images/
        └── tilemap.png
```

---

## Trin 3 – Find ud af tile-størrelsen

Åbn billedet i et billedredigeringsprogram og zoom meget ind. Find ud af:

- Hvor mange pixels er én tile bred og høj? (typisk 16 eller 32)
- Står typisk i en txt-fil der følger med
- Er der mellemrum (spacing) mellem tiles? (typisk 0 eller 1px)

Husk dem — du skal bruge dem i næste trin.

---

## Trin 4 – Indlæs tilesettet i BootScene

Åbn `src/scenes/BootScene.ts` og opdater `preload()` så den indlæser dit tileset:

```ts
preload(): void {
    this.load.spritesheet("tilemap", "assets/images/tilemap.png", {
        frameWidth: 16,   // ← ret til din tile-størrelse
        frameHeight: 16,  // ← ret til din tile-størrelse
        spacing: 1,       // ← 0 hvis der ikke er mellemrum
        margin: 0
    });
}
```

Sørg for at `create()` starter `MenuScene`:

```ts
create(): void {
    this.scene.start("MenuScene");
}
```

---

## Trin 5 – Find dine frame-numre

Åbn `jakobs-tilemap-viewer.html` i din browser.

1. Upload dit tileset-billede
2. Indstil tile bredde, højde og spacing til de samme værdier som i BootScene
3. Tryk **VIS**
4. Kig på tilesettet og skriv frame-numrene ned for de tiles du vil bruge:

| Tile | Frame-nummer |
|------|-------------|
| Gulv | _____ |
| Øverste væg | _____ |
| Nederste væg | _____ |
| Venstre væg | _____ |
| Højre væg | _____ |
| Øvre venstre hjørne | _____ |
| Øvre højre hjørne | _____ |
| Nedre venstre hjørne | _____ |
| Nedre højre hjørne | _____ |

> **Tip:** Klik på en tile i vieweren for at kopiere frame-nummeret til udklipsholderen.

---

## Trin 6 – Byg dit kort i GameScene

Åbn `src/scenes/GameScene.ts` og erstat indholdet med følgende skabelon.  
Udfyld dine egne frame-numre fra forrige trin:

```ts
// src/scenes/GameScene.ts
import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
    private walls!: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super({ key: "GameScene" });
    }

    create(): void {
        // ─── Kortets layout ──────────────────────────────────────────
        // Bogstaver bestemmer hvilken tile der tegnes hvor:
        // R = øvre venstre hjørne    W = øverste væg    S = øvre højre hjørne
        // O = venstre væg            . = gulv            Q = højre væg
        // T = nedre venstre hjørne   V = nederste væg   U = nedre højre hjørne

        const map = [
            "RWWWWWWWWWWWWWWS",
            "O..............Q",
            "O..............Q",
            "O..............Q",
            "O..............Q",
            "O..............Q",
            "O..............Q",
            "O..............Q",
            "O..............Q",
            "TVVVVVVVVVVVVVVU",
        ];

        const TILE  = 16;   // ← din tile-størrelse i pixels
        const SCALE = 2;    // forstørrelse — prøv 2 eller 3

        // ─── Dine frame-numre ────────────────────────────────────────
        const FLOOR_FRAME         = 0;   // ← ret til dine numre
        const UPPER_WALL_FRAME    = 0;
        const LOWER_WALL_FRAME    = 0;
        const LEFT_WALL_FRAME     = 0;
        const RIGHT_WALL_FRAME    = 0;
        const UPPER_LEFT_CORNER   = 0;
        const UPPER_RIGHT_CORNER  = 0;
        const LOWER_LEFT_CORNER   = 0;
        const LOWER_RIGHT_CORNER  = 0;

        this.walls = this.physics.add.staticGroup();

        // ─── Tegn kortet tile for tile ───────────────────────────────
        map.forEach((row, rowIndex) => {
            row.split("").forEach((cell, colIndex) => {
                const x = colIndex * TILE * SCALE + (TILE * SCALE) / 2;
                const y = rowIndex * TILE * SCALE + (TILE * SCALE) / 2;

                // Tegn altid gulv som bund-lag
                this.add.image(x, y, "tilemap", FLOOR_FRAME).setScale(SCALE);

                // Læg væg ovenpå hvis nødvendigt
                let wallFrame: number | null = null;

                if      (cell === "R") wallFrame = UPPER_LEFT_CORNER;
                else if (cell === "S") wallFrame = UPPER_RIGHT_CORNER;
                else if (cell === "T") wallFrame = LOWER_LEFT_CORNER;
                else if (cell === "U") wallFrame = LOWER_RIGHT_CORNER;
                else if (cell === "W") wallFrame = UPPER_WALL_FRAME;
                else if (cell === "V") wallFrame = LOWER_WALL_FRAME;
                else if (cell === "O") wallFrame = LEFT_WALL_FRAME;
                else if (cell === "Q") wallFrame = RIGHT_WALL_FRAME;

                if (wallFrame !== null) {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", wallFrame);
                    wall.setScale(SCALE);
                    wall.refreshBody();
                    this.walls.add(wall);
                }
            });
        });
    }

    update(): void {}
}
```

---

## Trin 7 – Tjek at det virker

Kør projektet med:

```bash
npm run dev
```

Åbn browseren og gå igennem MenuScene til GameScene.  
Du skulle gerne se dit rum tegnet med dine tiles.

**Er noget galt?**
- Tiles på forkerte steder → tjek at frame-numrene er rigtige i vieweren
- Sort skærm → tjek at filstien til tilemap.png er korrekt i BootScene
- Tiles ser "splattet" ud → prøv at ændre `spacing` i BootScene (0 eller 1)

---

## Du er færdig når...

- [ ] Dit tileset er indlæst korrekt (ingen fejl i konsollen)
- [ ] Der vises et rum med gulv og vægge på skærmen
- [ ] Hjørnerne sidder rigtigt
- [ ] Du kan ændre kortets layout ved at redigere `map`-arrayet

---

> Næste opgave: Vi sætter en spiller ind i verden og får ham til at bevæge sig rundt.
