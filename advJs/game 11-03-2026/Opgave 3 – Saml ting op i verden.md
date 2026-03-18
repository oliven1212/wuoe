# Opgave 3 – Saml ting op i verden


---

## Inden du går i gang

Du skal have opgave 2 færdig:
- En spiller der kan bevæge sig rundt
- Kollision med vægge der virker

---

## Trin 1 – Find en item-tile

Åbn `jakobs-tilemap-viewer.html` og find en tile der kan fungere som en ting der kan samles op.  
Det kan være en mønt, en nøgle, en potion, en stjerne — hvad der passer til dit tileset.

Skriv frame-nummeret ned:

| Tile | Frame-nummer |
|------|-------------|
| Item | _____ |

---

## Trin 2 – Tilføj variabler til klassen

Åbn `src/scenes/GameScene.ts` og tilføj to nye variabler øverst i klassen:

```ts
export class GameScene extends Phaser.Scene {
    private walls!: Phaser.Physics.Arcade.StaticGroup;
    private player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private items!: Phaser.Physics.Arcade.StaticGroup;  // ← tilføj
    private score: number = 0;                          // ← tilføj
    private scoreText!: Phaser.GameObjects.Text;        // ← tilføj
```

---

## Trin 3 – Placer items i verden

Tilføj dette i `create()` **efter** spilleren er spawnet:

```ts
// ─── Items ───────────────────────────────────────────────────
const ITEM_FRAME = 0; // ← ret til dit frame-nummer

this.items = this.physics.add.staticGroup();

// Placer items på specifikke tile-koordinater
// Format: [kolonne, række] — tæl fra 0 i dit map-array
const itemPositions = [
    [3, 2],
    [8, 4],
    [5, 7],
    [11, 3],
    [2, 6],
];

itemPositions.forEach(([col, row]) => {
    const x = col * TILE * SCALE + (TILE * SCALE) / 2;
    const y = row * TILE * SCALE + (TILE * SCALE) / 2;
    const item = this.items.create(x, y, "tilemap", ITEM_FRAME);
    item.setScale(SCALE);
    item.refreshBody();
});
```

> **Tip:** Sørg for at koordinaterne peger på gulvfelter i dit `map`-array — ikke på vægge.

---

## Trin 4 – Registrer når spilleren rører et item

Tilføj et **overlap** efter items er placeret.  
Overlap ligner collider, men i stedet for at stoppe spilleren kører det en funktion:

```ts
// ─── Overlap: spiller samler item op ─────────────────────────
this.physics.add.overlap(
    this.player,
    this.items,
    (_player, item) => {
        // Fjern itemet fra verden
        (item as Phaser.Physics.Arcade.Sprite).destroy();

        // Øg score
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);
    }
);
```

---

## Trin 5 – Vis score på skærmen

Tilføj score-teksten **efter** overlap er sat op:

```ts
// ─── Score-tekst ─────────────────────────────────────────────
// setScrollFactor(0) fastgør teksten til skærmen — ikke verden
this.scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "18px",
    color: "#ffffff",
    backgroundColor: "#000000",
    padding: { x: 8, y: 4 }
}).setScrollFactor(0);
```

> **Vigtigt:** `.setScrollFactor(0)` betyder at teksten sidder fast på skærmen selvom kameraet bevæger sig. Uden det følger teksten med verden og forsvinder ud af syne.

---

## Trin 6 – Tjek at det virker

Kør projektet og prøv at gå hen til et item.

**Er noget galt?**

| Problem | Løsning |
|---------|---------|
| Items vises ikke | Tjek at `ITEM_FRAME` er det rigtige nummer |
| Items ligger inde i vægge | Juster koordinaterne i `itemPositions` |
| Score opdateres ikke | Tjek at overlap-koden er tilføjet korrekt |
| Score-tekst følger med verden | Tjek at `.setScrollFactor(0)` er tilføjet |
| Items forsvinder ikke når man rører dem | Tjek at `item.destroy()` kaldes i overlap-funktionen |

---

## Ekstraopgaver — hvis du bliver hurtigt færdig

**Tilføj en vind-betingelse**  
Vis en besked når alle items er samlet op:

```ts
this.physics.add.overlap(
    this.player,
    this.items,
    (_player, item) => {
        (item as Phaser.Physics.Arcade.Sprite).destroy();
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);

        // Tjek om alle items er samlet op
        if (this.items.countActive() === 0) {
            this.add.text(
                this.cameras.main.centerX,
                this.cameras.main.centerY,
                "Du vandt!",
                { fontSize: "32px", color: "#00E5A0" }
            ).setOrigin(0.5).setScrollFactor(0);
        }
    }
);
```

**Tilføj en tæller for antal items tilbage**  
Vis hvor mange items der mangler at blive samlet:

```ts
// I create() — efter items er placeret:
this.scoreText.setText(
    "Score: 0  |  Items tilbage: " + this.items.countActive()
);

// I overlap-funktionen:
this.scoreText.setText(
    "Score: " + this.score + "  |  Items tilbage: " + this.items.countActive()
);
```

**Forskellige items med forskellig point-værdi**  
Giv forskellige items forskellig værdi ved at gemme point-værdien på selve itemet:

```ts
// Når du opretter items:
const item = this.items.create(x, y, "tilemap", ITEM_FRAME);
item.setScale(SCALE);
item.refreshBody();
item.setData("points", 10); // ← gem point-værdien

// I overlap-funktionen:
const points = (item as Phaser.Physics.Arcade.Sprite).getData("points");
this.score += points;
```

---
