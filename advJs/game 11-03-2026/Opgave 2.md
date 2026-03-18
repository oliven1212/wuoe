# Dag 2 · Opgave 2 – Fjender


---

## Inden du går i gang

Du skal have opgave 1 færdig:
- En spiller med animationer der kører korrekt

---

## Trin 1 – Find en fjende-tile

Åbn `jakobs-tilemap-viewer.html` og find en tile der kan fungere som fjende.  
Det kan være et monster, en vagt, en zombie — hvad der passer til dit tileset.

Skriv frame-nummeret ned:

| Tile | Frame-nummer |
|------|-------------|
| Fjende | _____ |

---

## Trin 2 – Tilføj variabler til klassen

Åbn `src/scenes/GameScene.ts` og tilføj disse variabler øverst i klassen:

```ts
export class GameScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private walls!: Phaser.Physics.Arcade.StaticGroup;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private speed: number = 120;
    private enemy!: Phaser.Physics.Arcade.Sprite;       // ← tilføj
    private patrolLeft  = 80;                            // ← tilføj
    private patrolRight = 430;                           // ← tilføj
    private patrolSpeed = 80;                            // ← tilføj
    private isInvincible: boolean = false;               // ← tilføj
```

> **Vigtigt:** `patrolSpeed` skal være mindst 60-100 — lavere værdier gør fjenden næsten usynlig langsom.

---

## Trin 3 – Nulstil variabler i starten af create()

Tilføj dette som det **allerførste** i `create()` — inden kortet tegnes.  
Det sikrer at spillet starter fra en ren tilstand når man genstarter:

```ts
create(): void {
    // Nulstil variabler ved scene-start
    this.isInvincible = false;

    // ... resten af create()
```

---

## Trin 4 – Spawn fjenden i create()

Tilføj dette **efter** spilleren er spawnet. Sørg for at fjenden **ikke** spawner på samme sted som spilleren — brug en position på den modsatte side af rummet:

```ts
// ─── Fjende ──────────────────────────────────────────────────
const ENEMY_FRAME = 0; // ← ret til dit frame-nummer

this.enemy = this.physics.add.sprite(400, 160, "tilemap", ENEMY_FRAME);
this.enemy.setScale(SCALE);

// Start patruljering til venstre
this.enemy.setVelocityX(-this.patrolSpeed);
```

> **Bemærk:** Vi bruger ikke `setGravityY` her — din gravity er allerede 0 i `gameConfig.ts` så det er unødvendigt.

---

## Trin 5 – Tilføj overlap med spilleren

Tilføj dette lige efter fjenden er spawnet:

```ts
// ─── Overlap: spiller rører fjende ───────────────────────────
this.physics.add.overlap(
    this.player,
    this.enemy,
    this.hitEnemy,
    undefined,
    this
);
```

Tilføj derefter `hitEnemy()` som en ny metode i klassen **uden for** `create()` og `update()`:

```ts
private hitEnemy(): void {
    if (this.isInvincible) return; // ignorer hvis allerede ramt

    // Gør spilleren usårbar i 1.5 sekunder
    // Forhindrer at overlap-callback fyrer mange gange på én gang
    this.isInvincible = true;
    this.player.setAlpha(0.5); // halvt gennemsigtig som visuel feedback

    this.time.delayedCall(1500, () => {
        this.isInvincible = false;
        this.player.setAlpha(1);
    });

    this.scene.start("GameOverScene");
}
```

---

## Trin 6 – Få fjenden til at patruljere i update()

Tilføj patruljerings-logikken i `update()`:

```ts
// ─── Fjende patruljering ──────────────────────────────────────
if (this.enemy.x >= this.patrolRight) {
    this.enemy.setVelocityX(-this.patrolSpeed); // vend til venstre
    this.enemy.setFlipX(true);
}
if (this.enemy.x <= this.patrolLeft) {
    this.enemy.setVelocityX(this.patrolSpeed);  // vend til højre
    this.enemy.setFlipX(false);
}
```

---

## Trin 7 – Tjek at det virker

Kør projektet og prøv at røre fjenden.

**Er noget galt?**

| Problem | Løsning |
|---------|---------|
| Fjenden vises ikke | Tjek at `ENEMY_FRAME` er det rigtige nummer |
| Fjenden bevæger sig ikke | Tjek at `patrolSpeed` er mindst 60-80 |
| Fjenden går ud af rummet | Juster `patrolLeft` og `patrolRight` — åbn konsollen med F12 og log `this.enemy.x` for at se koordinaterne |
| Man dør med det samme | Fjenden spawner for tæt på spilleren — flyt dens startposition |
| Game Over sker ikke ved kontakt | Tjek at `this.physics.add.overlap(...)` er tilføjet korrekt |
| Man kan ikke dø igen efter genstart | Tjek at `this.isInvincible = false` er tilføjet i toppen af `create()` |

---

## Ekstraopgave – hvis du bliver hurtigt færdig

**Tilføj en animation til fjenden:**

```ts
this.anims.create({
    key: "enemy-walk",
    frames: this.anims.generateFrameNumbers("tilemap", { start: 42, end: 45 }), // ← ret
    frameRate: 6,
    repeat: -1
});

this.enemy.anims.play("enemy-walk");
```

**Tilføj flere fjender med forskellig hastighed:**

```ts
// Lav en hjælpefunktion der spawner en fjende
const spawnEnemy = (x: number, y: number, speed: number) => {
    const e = this.physics.add.sprite(x, y, "tilemap", ENEMY_FRAME);
    e.setScale(SCALE);
    e.setVelocityX(speed);
    this.physics.add.overlap(this.player, e, this.hitEnemy, undefined, this);
    return e;
};

spawnEnemy(400, 160, 80);
spawnEnemy(200, 250, 120);
```

---

