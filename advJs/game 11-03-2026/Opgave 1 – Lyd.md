# Dag 3 · Opgave 1 – Lyd




## Inden du går i gang

Du skal have dit projekt fra dag 2 kørende:
- Items der kan samles op
- En fjende der kan ramme spilleren

Du skal også bruge lydfiler i `.mp3`-format. Du kan finde gratis lyde på:
- **[freesound.org](https://freesound.org)** — stort bibliotek, kræver gratis konto
- **[kenney.nl/assets](https://kenney.nl/assets)** — søg på "audio" — CC0 lyde klar til brug

---

## Trin 1 – Læg lydfiler i projektet

Opret denne mappestruktur under `public/`:

```
public/
└── assets/
    └── audio/
        ├── coin.mp3        ← lyd når man samler item op
        ├── hurt.mp3        ← lyd når man bliver ramt
        └── music.mp3       ← baggrundsmusik
```

> **Tip:** Brug korte, simple lydfiler til effekter — under 1 sekund er ideelt. Musikfilen kan være længere.

---

## Trin 2 – Indlæs lyde i BootScene

Åbn `src/scenes/BootScene.ts` og tilføj lydfilerne i `preload()`:

```ts
preload(): void {
    // ... eksisterende kode ...

    // ─── Lyde ────────────────────────────────────────────────────
    this.load.audio("coin",  "assets/audio/coin.mp3");
    this.load.audio("hurt",  "assets/audio/hurt.mp3");
    this.load.audio("music", "assets/audio/music.mp3");
}
```

> **Ret filnavnene** til hvad dine filer hedder. Nøglen (fx `"coin"`) er det navn du bruger i resten af koden.

---

## Trin 3 – Tilføj lyde i GameScene

Åbn `src/scenes/GameScene.ts` og tilføj lydvariabler øverst i klassen:

```ts
export class GameScene extends Phaser.Scene {
    // ... eksisterende variabler ...
    private coinSound!: Phaser.Sound.BaseSound;   // ← tilføj
    private hurtSound!: Phaser.Sound.BaseSound;   // ← tilføj
    private music!: Phaser.Sound.BaseSound;       // ← tilføj
```

Tilføj dette i `create()` — **efter** kameraet er sat op:

```ts
// ─── Lyd ─────────────────────────────────────────────────────
this.coinSound = this.sound.add("coin",  { volume: 0.5 });
this.hurtSound = this.sound.add("hurt",  { volume: 0.6 });
this.music     = this.sound.add("music", { volume: 0.2, loop: true });

// Start baggrundsmusik
this.music.play();
```

---

## Trin 4 – Afspil lyd når item samles op

Find din overlap-callback for items og tilføj `this.coinSound.play()`:

```ts
this.physics.add.overlap(
    this.player,
    this.items,
    (_player, item) => {
        (item as Phaser.Physics.Arcade.Sprite).destroy();
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);
        this.coinSound.play(); // ← tilføj denne linje
    }
);
```

---

## Trin 5 – Afspil lyd når spilleren bliver ramt

Find din `hitEnemy()` metode og tilføj `this.hurtSound.play()`:

```ts
private hitEnemy(): void {
    if (this.isInvincible) return;

    this.hurtSound.play(); // ← tilføj denne linje

    this.lives--;
    this.lives = Math.max(0, this.lives);
    this.livesText.setText("❤️ ".repeat(this.lives).trim());

    // ... resten af metoden som før ...
}
```

---

## Trin 6 – Stop musikken ved scene-skift

Musikken fortsætter i baggrunden hvis du ikke stopper den når scenen skifter. Tilføj en `shutdown()`-metode i bunden af GameScene — **efter** `hitEnemy()`:

```ts
shutdown(): void {
    // Stoppes automatisk når scenen lukkes
    if (this.music) {
        this.music.stop();
    }
}
```

---

## Trin 7 – Tjek at det virker

Kør projektet og test lydene.

**Er noget galt?**

| Problem | Løsning |
|---------|---------|
| Ingen lyd overhovedet | Tjek at filerne ligger i `public/assets/audio/` og at navnene matcher |
| `this.coinSound is not defined` | Tjek at `this.sound.add(...)` er kaldt i `create()` inden overlap |
| Musikken stopper ikke ved GameOver | Tilføj `shutdown()` metoden i GameScene |
| Musikken spiller to gange ved genstart | Tilføj `shutdown()` metoden så den stoppes korrekt |
| Lyden er for høj/lav | Juster `volume` — effekter: 0.3–0.8, musik: 0.1–0.3 |
| Browseren blokerer lyd | Klik et sted i browseren — browsere kræver brugerinteraktion før lyd afspilles |

---

## Ekstraopgave – hvis du bliver hurtigt færdig

**Tilføj en lyd til boosteren:**

```ts
// I BootScene preload():
this.load.audio("boost", "assets/audio/boost.mp3");

// I GameScene create():
const boostSound = this.sound.add("boost", { volume: 0.7 });

// I booster overlap-callback:
boostSound.play();
```

**Skift musik mellem rum:**  
Hvis du har lavet flere rum kan du afspille forskellig musik i hvert rum ved at indlæse flere musikfiler og starte den rigtige i hvert rums `create()`.

**Tilføj en sejrs-lyd:**  
Afspil en fanfare når alle items er samlet op:

```ts
// I BootScene preload():
this.load.audio("win", "assets/audio/win.mp3");

// I item overlap-callback:
if (this.items.countActive() === 0) {
    this.music.stop();
    this.sound.play("win");
}
```

