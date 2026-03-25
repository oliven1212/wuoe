# Dag 3 · Opgave 2 – Flere rum


## Inden du går i gang

Du skal have dit projekt kørende med:

- En spiller der kan bevæge sig rundt
- Items og score der virker

---

## Hvad skal vi bygge?

```
Room1Scene  →  (spiller rører dør)  →  Room2Scene
                                        (score følger med)
```

Du kan omdøbee nuværende `GameScene` til `Room1Scene`, og så laver vi en ny `Room2Scene` som spilleren kan komme til via en dør.

---

## Trin 1 – Omdøb GameScene til Room1Scene

**1a. Omdøb filen:**  
Omdøb `src/scenes/GameScene.ts` til `src/scenes/Room1Scene.ts`

**1b. Ret indholdet af filen:**  
Øverst i filen — erstat klasse-navn og key:

```ts
// FJERN:
export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

// TILFØJ:
export class Room1Scene extends Phaser.Scene {
    constructor() {
        super({ key: "Room1Scene" });
    }
```

**1c. Opdater gameConfig.ts:**

```ts
// FJERN:
import { GameScene } from "@scenes/GameScene";

// TILFØJ:
import { Room1Scene } from "@scenes/Room1Scene";
```

Og opdater scene-arrayet:

```ts
// FJERN:
scene: [BootScene, MenuScene, GameScene, GameOverScene],

// TILFØJ:
scene: [BootScene, MenuScene, Room1Scene, GameOverScene],
```

**1d. Opdater MenuScene:**  
Find linjen hvor du starter GameScene og ret den:

```ts
// FJERN:
this.scene.start("GameScene");

// TILFØJ:
this.scene.start("Room1Scene");
```

**1e. Opdater GameOverScene:**  
Find linjen hvor du genstarter spillet og ret den:

```ts
// FJERN:
this.scene.start("GameScene");

// TILFØJ:
this.scene.start("Room1Scene");
```

**Tjek:** Kør `npm run dev` og bekræft at spillet stadig virker — bare med nyt navn.

---

## Trin 2 – Find en dør-tile

Åbn `tilemap-viewer.html` og find en tile der kan fungere som dør eller passage.

| Tile | Frame-nummer |
|------|-------------|
| Dør | _____ |

---

## Trin 3 – Tilføj en dør i Room1Scene

Åbn `src/scenes/Room1Scene.ts` og find et sted i dit map-array hvor du vil placere døren. Tilføj et bogstav — fx `D` — i kortet:

```ts
const map = [
    "RWWWWWWWWWWWWWWS",
    "O..............Q",
    "O..............Q",
    "O..............Q",
    "O......D.......Q",  // ← D = dør
    "O.....P........Q",
    "O..............Q",
    "O..............Q",
    "O..............Q",
    "TVVVVVVVVVVVVVVU",
];
```

Tilføj et frame-nummer til dør-tile:

```ts
const DOOR_FRAME = 0; // ← ret til dit frame-nummer
```

Og tilføj dør-tegning i kortets forEach-løkke:

```ts
} else if (cell === "D") {
    // Tegn gulv under døren
    this.add.image(x, y, "tilemap", FLOOR_FRAME).setScale(SCALE);
    // Tegn dør-tile ovenpå
    const door = this.physics.add.staticSprite(x, y, "tilemap", DOOR_FRAME);
    door.setScale(SCALE);
    door.refreshBody();

    // Overlap: spiller rører døren → skift scene
    this.physics.add.overlap(
        this.player,
        door,
        () => {
            this.scene.start("Room2Scene", { score: this.score });
        }
    );
}
```

---

## Trin 4 – Opret Room2Scene

Opret en ny fil: `src/scenes/Room2Scene.ts`

Start med en simpel version — du kan udbygge kortet bagefter:

```ts
// src/scenes/Room2Scene.ts
import Phaser from "phaser";

export class Room2Scene extends Phaser.Scene {
    private score: number = 0;

    constructor() {
        super({ key: "Room2Scene" });
    }

    init(data: { score: number }): void {
        // Modtag score fra Room1Scene
        this.score = data.score ?? 0;
    }

    create(): void {
        const TILE  = 16;
        const SCALE = 2;

        // ─── Kort til rum 2 ──────────────────────────────────────────
        // Byg dit eget kort her — eller brug et af disse som udgangspunkt
        const map = [
            "RWWWWWWWWWWWWWWS",
            "O..............Q",
            "O..............Q",
            "O..............Q",
            "O..............Q",
            "O.....P........Q",
            "O..............Q",
            "O..............Q",
            "O..............Q",
            "TVVVVVVVVVVVVVVU",
        ];

        const FLOOR_FRAME        = 109; // ← ret til dine frame-numre
        const UPPER_WALL_FRAME   = 97;
        const LOWER_WALL_FRAME   = 121;
        const LEFT_WALL_FRAME    = 108;
        const RIGHT_WALL_FRAME   = 110;
        const UPPER_LEFT_CORNER  = 96;
        const UPPER_RIGHT_CORNER = 98;
        const LOWER_RIGHT_CORNER = 122;
        const LOWER_LEFT_CORNER  = 120;

        const walls = this.physics.add.staticGroup();
        let playerX = 0;
        let playerY = 0;

        map.forEach((row, rowIndex) => {
            row.split("").forEach((cell, colIndex) => {
                const x = colIndex * TILE * SCALE + (TILE * SCALE) / 2;
                const y = rowIndex * TILE * SCALE + (TILE * SCALE) / 2;

                if (cell === "U") {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", LOWER_RIGHT_CORNER);
                    wall.setScale(SCALE); wall.refreshBody(); walls.add(wall);
                } else if (cell === "T") {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", LOWER_LEFT_CORNER);
                    wall.setScale(SCALE); wall.refreshBody(); walls.add(wall);
                } else if (cell === "S") {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", UPPER_RIGHT_CORNER);
                    wall.setScale(SCALE); wall.refreshBody(); walls.add(wall);
                } else if (cell === "R") {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", UPPER_LEFT_CORNER);
                    wall.setScale(SCALE); wall.refreshBody(); walls.add(wall);
                } else if (cell === "W") {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", UPPER_WALL_FRAME);
                    wall.setScale(SCALE); wall.refreshBody(); walls.add(wall);
                } else if (cell === "V") {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", LOWER_WALL_FRAME);
                    wall.setScale(SCALE); wall.refreshBody(); walls.add(wall);
                } else if (cell === "O") {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", LEFT_WALL_FRAME);
                    wall.setScale(SCALE); wall.refreshBody(); walls.add(wall);
                } else if (cell === "Q") {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", RIGHT_WALL_FRAME);
                    wall.setScale(SCALE); wall.refreshBody(); walls.add(wall);
                } else {
                    this.add.image(x, y, "tilemap", FLOOR_FRAME).setScale(SCALE);
                    if (cell === "P") {
                        playerX = x;
                        playerY = y;
                    }
                }
            });
        });

        // ─── Spiller ─────────────────────────────────────────────────
        const player = this.physics.add.sprite(playerX, playerY, "bulbasaur", 0);
        player.setScale(SCALE);
        player.setCollideWorldBounds(true);

        this.physics.add.collider(player, walls);

        // ─── Kamera ──────────────────────────────────────────────────
        const mapWidth  = map[0].length * TILE * SCALE;
        const mapHeight = map.length    * TILE * SCALE;
        this.cameras.main
            .setBounds(0, 0, mapWidth, mapHeight)
            .startFollow(player);

        // ─── Input ───────────────────────────────────────────────────
        const cursors = this.input.keyboard!.createCursorKeys();

        // ─── Score fra rum 1 ─────────────────────────────────────────
        this.add.text(16, 16, "Score: " + this.score, {
            fontSize: "18px",
            color: "#ffffff",
            backgroundColor: "#000000",
            padding: { x: 8, y: 4 }
        }).setScrollFactor(0);

        // ─── Update via event ─────────────────────────────────────────
        // Da vi ikke har en klasse her, bruger vi en lokal funktion
        this.events.on("update", () => {
            player.setVelocity(0);
            if (cursors.left.isDown)  player.setVelocityX(-120);
            if (cursors.right.isDown) player.setVelocityX(120);
            if (cursors.up.isDown)    player.setVelocityY(-120);
            if (cursors.down.isDown)  player.setVelocityY(120);
        });
    }
}
```

---

## Trin 5 – Registrer Room2Scene i gameConfig.ts

Åbn `src/config/gameConfig.ts` og tilføj den nye scene:

```ts
// Tilføj import:
import { Room2Scene } from "@scenes/Room2Scene";

// Tilføj i scene-arrayet:
scene: [BootScene, MenuScene, Room1Scene, Room2Scene, GameOverScene],
```

> **Vigtigt:** Rækkefølgen i arrayet afgør hvilken scene der starter først — den første startes automatisk.

---

## Trin 6 – Tjek at det virker

Kør projektet og gå hen til døren.

**Er noget galt?**

| Problem | Løsning |
|---------|---------|
| `Room2Scene is not defined` | Tjek at Room2Scene er importeret og tilføjet i gameConfig.ts |
| Spilleren teleporterer ikke ved døren | Tjek at `this.physics.add.overlap(player, door, ...)` er tilføjet korrekt |
| Score er 0 i rum 2 | Tjek at `{ score: this.score }` sendes med i `scene.start()` |
| Score vises ikke i rum 2 | Tjek at `init(data)` er implementeret i Room2Scene |
| Spilleren kan ikke bevæge sig i rum 2 | Tjek at `this.events.on("update", ...)` er tilføjet |
| `key "Room2Scene" not found` | Tjek stavning — key i `super({ key: "Room2Scene" })` skal matche præcist |

---

## Ekstraopgave – hvis du bliver hurtigt færdig

**Tilføj en dør tilbage til rum 1:**  
Sæt en `D`-tile i Room2Scene's kort og lav overlap der sender spilleren tilbage:

```ts
this.physics.add.overlap(player, door, () => {
    this.scene.start("Room1Scene", { score: this.score });
});
```

Husk at Room1Scene også skal modtage score via `init(data)` — tilføj det øverst i Room1Scene:

```ts
private score: number = 0;

init(data: { score: number }): void {
    this.score = data.score ?? 0;
}
```

**Tilføj nye items i rum 2:**  
Kopier item-koden fra Room1Scene ind i Room2Scene og tilpas positionerne.

**Giv de to rum forskelligt udseende:**  
Brug forskellige floor- og wall-frames i de to rum så det er tydeligt man er et nyt sted.

