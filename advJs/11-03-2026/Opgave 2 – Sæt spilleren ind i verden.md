# Opgave 2 – Sæt spilleren ind i verden


---

## Inden du går i gang

Du skal have opgave 1 færdig:
- Et kørende projekt med et rum tegnet af tiles
- Vægge der er sat op som `StaticGroup`

---

## Trin 1 – Find din spiller-tile

Åbn `jakobs-tilemap-viewer.html` igen og find en tile der kan fungere som spiller.  
Det kan være en karakter, en ridder, en troldmand, en flot underviser — hvad der nu passer til dit tileset. 

Ikke alle sæt med assets kommer med en karakter. Men søger du efter f.eks. "16x16px character" skulle der komme mange frem.
  
Skriv frame-nummeret ned:

| Tile | Frame-nummer |
|------|-------------|
| Spiller | _____ |

---

## Trin 2 – Tilføj spiller til GameScene

Åbn `src/scenes/GameScene.ts`.

Tilføj `player` som en privat variabel øverst i klassen — lige under `walls`:

```ts
export class GameScene extends Phaser.Scene {
    private walls!: Phaser.Physics.Arcade.StaticGroup;
    private player!: Phaser.Physics.Arcade.Sprite;  // ← tilføj denne
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;  // ← og denne
```

# **_Bonus info!_**

Det er TypeScript-specifikt og kaldes en **non-null assertion**.

```ts
private player!: Phaser.Physics.Arcade.Sprite;
```

Det betyder at du fortæller TypeScript: *"Jeg ved godt at denne variabel ikke er sat endnu, men jeg lover at den vil være sat inden jeg bruger den."*

Uden `!` ville TypeScript klage med en fejl som:

```
Property 'player' has no initializer and is not definitely assigned in the constructor.
```

Det er fordi TypeScript kan se at `player` ikke tildeles en værdi i `constructor()` — den tildeles først inde i `create()` — og TypeScript er nervøs for at du måske bruger den før den er sat.

`!` er altså en måde at fortælle TypeScript at den skal slappe af og stole på dig.

Det er dog vigtigt at forstå at det **kun er en besked til TypeScript** — det ændrer ikke noget i den kode der faktisk kører i browseren. Hvis du rent faktisk bruger `this.player` før `create()` har kørt, crasher spillet stadig med en fejl. `!` fjerner bare advarslen, den løser ikke problemet hvis den bruges forkert.

---

## Trin 3 – Spawn spilleren efter kortet er tegnet

Find det sted i `create()` hvor du vil have spilleren til at starte — fx midt i rummet.  
Tilføj dette **efter** `map.forEach(...)` løkken er færdig:

```ts
// ─── Spawn spiller efter kortet er tegnet ────────────────────
// Vigtigt: spawnes sidst så spilleren tegnes øverst
const PLAYER_FRAME = 0;   // ← ret til dit frame-nummer
const PLAYER_START_X = 5; // ← hvilken kolonne (tæl fra 0)
const PLAYER_START_Y = 5; // ← hvilken række (tæl fra 0)

const px = PLAYER_START_X * TILE * SCALE + (TILE * SCALE) / 2;
const py = PLAYER_START_Y * TILE * SCALE + (TILE * SCALE) / 2;

this.player = this.physics.add.sprite(px, py, "tilemap", PLAYER_FRAME);
this.player.setScale(SCALE);
this.player.setCollideWorldBounds(true);
```

> **Tip:** `PLAYER_START_X` og `PLAYER_START_Y` er tile-koordinater, ikke pixels.  
> Tæl kolonner og rækker i dit `map`-array for at finde et åbent gulvfelt.

---

## Trin 4 – Tilføj kollision og input

Tilføj dette lige efter spilleren er spawnet:

```ts
// ─── Kollision ───────────────────────────────────────────────
// Forhindrer spilleren i at gå through vægge
this.physics.add.collider(this.player, this.walls);

// ─── Kamera ──────────────────────────────────────────────────
// Kameraet følger spilleren
const mapWidth  = map[0].length * TILE * SCALE;
const mapHeight = map.length    * TILE * SCALE;
this.cameras.main
    .setBounds(0, 0, mapWidth, mapHeight)
    .startFollow(this.player);

// ─── Input ───────────────────────────────────────────────────
this.cursors = this.input.keyboard!.createCursorKeys();
```

---

## Trin 5 – Få spilleren til at bevæge sig

Din `update()` metode kører ~60 gange i sekundet. Tilføj bevægelseskoden her:

```ts
update(): void {
    const speed = 120; // pixels per sekund — prøv at ændre dette

    // Nulstil hastighed hver frame
    this.player.setVelocity(0);

    // Bevæg spilleren efter hvilke taster der holdes nede
    if (this.cursors.left.isDown)  this.player.setVelocityX(-speed);
    if (this.cursors.right.isDown) this.player.setVelocityX(speed);
    if (this.cursors.up.isDown)    this.player.setVelocityY(-speed);
    if (this.cursors.down.isDown)  this.player.setVelocityY(speed);
}
```

---

## Trin 6 – Tjek at det virker

Kør projektet og prøv at bevæge spilleren rundt.

**Er noget galt?**

| Problem | Løsning |
|---------|---------|
| Spilleren vises ikke | Tjek at `PLAYER_FRAME` er det rigtige nummer |
| Spilleren starter inde i en væg | Juster `PLAYER_START_X` og `PLAYER_START_Y` |
| Spilleren går gennem vægge | Tjek at `this.physics.add.collider(...)` er tilføjet |
| Spilleren er skjult bag tiles | Sørg for at spawn-koden kommer **efter** `map.forEach(...)` |
| Spilleren bevæger sig for hurtigt/langsomt | Juster `speed` i `update()` |
| Kameraet følger ikke med | Tjek at `.startFollow(this.player)` er tilføjet |

---

## Ekstraopgaver — hvis du bliver hurtigt færdig

Prøv en eller flere af disse:

**Diagonal bevægelse er hurtigere end lige**  
Når man bevæger sig diagonalt adderes X og Y hastighed, og man bevæger sig ca. 41% hurtigere. Det kan fixes sådan:

```ts
// Normaliser hastigheden ved diagonal bevægelse
const vx = (this.cursors.left.isDown ? -1 : 0) + (this.cursors.right.isDown ? 1 : 0);
const vy = (this.cursors.up.isDown   ? -1 : 0) + (this.cursors.down.isDown  ? 1 : 0);
const len = Math.sqrt(vx * vx + vy * vy) || 1;

this.player.setVelocityX((vx / len) * speed);
this.player.setVelocityY((vy / len) * speed);
```

**Udvid dit kort**  
Tilføj flere rum eller gange ved at udvide `map`-arrayet med flere bogstaver.  
Husk at alle rækker skal have samme antal tegn.

**Skift spiller-tile afhængigt af retning**  
Hvis dit tileset har separate tiles for højre og venstre kan du skifte frame når spilleren bevæger sig:

```ts
if (this.cursors.left.isDown) {
    this.player.setFrame(PLAYER_FRAME_LEFT);
} else if (this.cursors.right.isDown) {
    this.player.setFrame(PLAYER_FRAME_RIGHT);
}
```

---



> Næste opgave: Vi tilføjer ting i verden som spilleren kan samle op.