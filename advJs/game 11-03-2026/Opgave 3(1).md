# Dag 2 · Opgave 3 – Score, liv og GameOver



---

## Inden du går i gang

Du skal have opgave 2 færdig:
- En patruljerende fjende der sender spilleren til GameOver

---

## Trin 1 – Tilføj variabler til klassen

Åbn `src/scenes/GameScene.ts` og tilføj disse variabler øverst i klassen:

```ts
export class GameScene extends Phaser.Scene {
    // ... eksisterende variabler ...
    private score: number = 0;                          // ← tilføj
    private lives: number = 3;                          // ← tilføj
    private scoreText!: Phaser.GameObjects.Text;        // ← tilføj
    private livesText!: Phaser.GameObjects.Text;        // ← tilføj
    private items!: Phaser.Physics.Arcade.StaticGroup;  // ← tilføj
```

---

## Trin 2 – Nulstil alle variabler i create()

Det er vigtigt at nulstille **alle** variabler når scenen starter — ellers beholder de deres gamle værdier fra forrige runde når man genstarter:

```ts
create(): void {
    // Nulstil variabler ved scene-start
    this.isInvincible = false;
    this.lives = 3;
    this.score = 0;

    // ... resten af create()
```

---

## Trin 3 – Tilføj items i verden

Find et item-frame i `jakobs-tilemap-viewer.html` — en mønt, nøgle, potion eller lignende.

Tilføj dette i `create()` **efter** spilleren er spawnet:

```ts
// ─── Items ───────────────────────────────────────────────────
const ITEM_FRAME = 0; // ← ret til dit frame-nummer

this.items = this.physics.add.staticGroup();

// Placer items på specifikke tile-koordinater [kolonne, række]
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

// Overlap: spiller samler item op
this.physics.add.overlap(
    this.player,
    this.items,
    (_player, item) => {
        (item as Phaser.Physics.Arcade.Sprite).destroy();
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);
    }
);
```

---

## Trin 4 – Tilføj score og liv på skærmen

Tilføj dette **efter** items-koden:

```ts
// ─── UI: score og liv ────────────────────────────────────────
// setScrollFactor(0) fastgør teksten til skærmen — ikke verden
this.scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "18px",
    color: "#ffffff",
    backgroundColor: "#000000",
    padding: { x: 8, y: 4 }
}).setScrollFactor(0);

this.livesText = this.add.text(16, 50, "❤️ ❤️ ❤️", {
    fontSize: "18px",
    backgroundColor: "#000000",
    padding: { x: 8, y: 4 }
}).setScrollFactor(0);
```

---

## Trin 5 – Opdater hitEnemy() med liv

Find din `hitEnemy()` metode fra opgave 2 og erstat den med denne version der tæller liv ned:

```ts
private hitEnemy(): void {
    if (this.isInvincible) return;

    this.lives--;

    // Math.max sikrer at lives aldrig går under 0
    // Uden dette får String.repeat() en negativ værdi og crasher
    this.lives = Math.max(0, this.lives);

    this.livesText.setText("❤️ ".repeat(this.lives).trim());

    // Usårbarhedsperiode
    this.isInvincible = true;
    this.player.setAlpha(0.5);

    this.time.delayedCall(1500, () => {
        this.isInvincible = false;
        this.player.setAlpha(1);
    });

    if (this.lives <= 0) {
        this.isInvincible = false; // nulstil inden scene skifter
        this.scene.start("GameOverScene", { score: this.score });
    }
}
```

> **Vigtigt:** `Math.max(0, this.lives)` er nødvendig — uden den kan `this.lives` blive `-1` og `"❤️".repeat(-1)` crasher med en `RangeError`.

---

## Trin 6 – Opdater GameOverScene

Åbn `src/scenes/GameOverScene.ts` og sørg for at den modtager og viser scoren:

```ts
export class GameOverScene extends Phaser.Scene {
    private finalScore: number = 0;

    constructor() {
        super({ key: "GameOverScene" });
    }

    init(data: { score: number }): void {
        // Modtag score fra GameScene
        // ?? 0 sikrer at vi får 0 hvis data er undefined
        this.finalScore = data.score ?? 0;
    }

    create(): void {
        const cx = this.cameras.main.centerX;
        const cy = this.cameras.main.centerY;

        this.add.text(cx, cy - 80, "GAME OVER", {
            fontSize: "48px",
            color: "#F0883E",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.add.text(cx, cy, `Score: ${this.finalScore}`, {
            fontSize: "28px",
            color: "#00E5A0"
        }).setOrigin(0.5);

        this.add.text(cx, cy + 80, "Tryk ENTER for at prøve igen", {
            fontSize: "16px",
            color: "#8B949E"
        }).setOrigin(0.5);

        this.input.keyboard!.once("keydown-ENTER", () => {
            this.scene.start("GameScene");
        });
    }
}
```

---

## Trin 7 – Tjek at det virker

Kør projektet og test hele flowet.

**Er noget galt?**

| Problem | Løsning |
|---------|---------|
| `RangeError: Invalid count value` | Tilføj `this.lives = Math.max(0, this.lives)` i `hitEnemy()` |
| Score opdateres ikke | Tjek at `this.scoreText.setText(...)` kaldes i overlap-callback |
| Liv-teksten ændrer sig ikke | Tjek at `this.livesText.setText(...)` kaldes i `hitEnemy()` |
| Score er altid 0 i GameOver | Tjek at `{ score: this.score }` sendes med i `scene.start()` |
| Score vises ikke i GameOver | Tjek at `init(data)` er implementeret i GameOverScene |
| Score og liv nulstilles ikke ved genstart | Tilføj `this.score = 0` og `this.lives = 3` i toppen af `create()` |
| Teksten følger med verden | Tilføj `.setScrollFactor(0)` på begge tekster |

---

## Ekstraopgave – hvis du bliver hurtigt færdig

**Vis antal items tilbage:**

```ts
// Tilføj en ekstra tekst efter de andre UI-tekster:
const itemsText = this.add.text(16, 84,
    "Items: " + this.items.countActive(), {
    fontSize: "18px",
    color: "#ffffff",
    backgroundColor: "#000000",
    padding: { x: 8, y: 4 }
}).setScrollFactor(0);

// Opdater den i overlap-callback:
itemsText.setText("Items: " + this.items.countActive());
```

**Tilføj en vind-betingelse:**

```ts
// I overlap-callback efter score opdateres:
if (this.items.countActive() === 0) {
    this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "Du vandt! 🎉",
        { fontSize: "32px", color: "#00E5A0" }
    ).setOrigin(0.5).setScrollFactor(0);
}
```

---
