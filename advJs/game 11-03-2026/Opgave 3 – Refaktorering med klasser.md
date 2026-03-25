# Opgave 3 – Refaktorering med klasser


## Hvad er pointen?

Din GameScene er efterhånden vokset sig stor. Den håndterer spilleren, fjenden, items, UI og kollision — alt sammen i én fil. Det virker, men det er svært at finde rundt i.

Med klasser kan vi samle logik der hører sammen:

```
Før:                          Efter:
GameScene.ts (~200 linjer)    GameScene.ts (~80 linjer)
                              objects/Player.ts
                              objects/Enemy.ts
```

**Vigtigt:** Spillet skal opføre sig præcist det samme efter refaktoreringen. Vi ændrer ikke funktionalitet — kun struktur.

---

## Inden du går i gang

Tjek at dit projekt har en `objects/`-mappe under `src/`:

```
src/
├── scenes/
│   └── GameScene.ts
├── objects/        ← skal bruges til nye filer
└── config/
```

Hvis `objects/`-mappen ikke findes, opret den.

---

## Trin 1 – Ryd op i GameScene.ts

Før vi laver nye klasser, rydder vi op i det vi har.

**Find og fjern duplikeret kode:**  
Kig i din `update()` — har du de samme `if (cursors.left.isDown)`-blokke to gange? Slet den ene.

**Fjern `console.log`:**  
Slet alle `console.log(...)` der logger fjendets eller spillerens position.

**Fjern ubrugte variabler:**  
Hvis du har en `moving`-variabel der aldrig bruges, slet den.

**Tjek:** Gem og kør `npm run dev`. Spillet skal stadig virke som før.

---

## Trin 2 – Lav Enemy-klassen

Opret filen `src/objects/Enemy.ts`:

```ts
// src/objects/Enemy.ts
import Phaser from "phaser";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    private patrolLeft: number;
    private patrolRight: number;
    private patrolSpeed: number;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame: number,
        patrolLeft: number,
        patrolRight: number,
        patrolSpeed: number
    ) {
        super(scene, x, y, texture, frame);

        // Disse to linjer registrerer spriten i scenen og physics-systemet
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.patrolLeft  = patrolLeft;
        this.patrolRight = patrolRight;
        this.patrolSpeed = patrolSpeed;

        this.setScale(2); // ← ret til din SCALE-værdi
        this.setVelocityX(patrolSpeed);
    }

    update(): void {
        if (this.x >= this.patrolRight) {
            this.setVelocityX(-this.patrolSpeed);
            this.setFlipX(true);
        }
        if (this.x <= this.patrolLeft) {
            this.setVelocityX(this.patrolSpeed);
            this.setFlipX(false);
        }
    }
}
```

> **Bemærk:** `scene.add.existing(this)` og `scene.physics.add.existing(this)` er nødvendige fordi vi opretter spriten udenfor Phaser — uden dem vises fjenden ikke og har ingen fysik.

---

## Trin 3 – Brug Enemy-klassen i GameScene

**3a. Tilføj import øverst i GameScene.ts:**

```ts
import { Enemy } from "@objects/Enemy";
```

**3b. Erstat fjende-variablerne øverst i klassen:**

```ts
// FJERN disse:
private enemy!: Phaser.Physics.Arcade.Sprite;
private patrolLeft  = 80;
private patrolRight = 430;
private patrolSpeed = 80;

// TILFØJ denne:
private enemy!: Enemy;
```

**3c. Erstat fjende-spawning i create():**

Find hvor du spawner fjenden og erstat det med:

```ts
// FJERN den gamle spawning:
this.enemy = this.physics.add.sprite(400, 160, "tilemap", ENEMY_FRAME);
this.enemy.setScale(SCALE);
this.enemy.setVelocityX(this.patrolSpeed);

// TILFØJ:
this.enemy = new Enemy(
    this,          // scene
    400,           // x — ret til dit tal
    160,           // y — ret til dit tal
    "tilemap",     // texture — ret til din fjende-texture
    0,             // frame — ret til dit frame-nummer
    80,            // patrolLeft — ret til dit tal
    430,           // patrolRight — ret til dit tal
    80             // patrolSpeed — ret til dit tal
);
```

**3d. Erstat patruljering i update():**

```ts
// FJERN:
if (this.enemy.x >= this.patrolRight) {
    this.enemy.setVelocityX(-this.patrolSpeed);
    this.enemy.setFlipX(true);
}
if (this.enemy.x <= this.patrolLeft) {
    this.enemy.setVelocityX(this.patrolSpeed);
    this.enemy.setFlipX(false);
}

// TILFØJ:
this.enemy.update();
```

**Tjek:** Gem og kør `npm run dev`. Fjenden skal stadig patruljere som før.

---

## Trin 4 – Lav Player-klassen

Opret filen `src/objects/Player.ts`.  
Tilpas animationsnavne og frame-numre til dit eget spritesheet:

```ts
// src/objects/Player.ts
import Phaser from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
    private speed: number;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number, speed: number = 120) {
        super(scene, x, y, "player", 0); // ← ret "player" til din texture

        // Registrer i scenen og physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = speed;
        this.setScale(2); // ← ret til din SCALE-værdi
        this.setCollideWorldBounds(true);

        // Opret animationer
        this.createAnimations(scene);

        // Start med idle-animation
        this.anims.play("idle");

        // Opret input
        this.cursors = scene.input.keyboard!.createCursorKeys();
    }

    private createAnimations(scene: Phaser.Scene): void {
        // Tjek om animationerne allerede er oprettet
        // (vigtigt ved scene-genstart)
        if (scene.anims.exists("idle")) return;

        // ─── Ret frame-numrene til dine egne ───────────────────────
        scene.anims.create({
            key: "walk-down",
            frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: "walk-left",
            frames: scene.anims.generateFrameNumbers("player", { start: 4, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: "walk-right",
            frames: scene.anims.generateFrameNumbers("player", { start: 8, end: 11 }),
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: "walk-up",
            frames: scene.anims.generateFrameNumbers("player", { start: 12, end: 15 }),
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: "idle",
            frames: [{ key: "player", frame: 0 }],
            frameRate: 1
        });
    }

    update(): void {
        this.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.anims.play("walk-left", true);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.speed);
            this.anims.play("walk-right", true);
        } else if (this.cursors.up.isDown) {
            this.setVelocityY(-this.speed);
            this.anims.play("walk-up", true);
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(this.speed);
            this.anims.play("walk-down", true);
        } else {
            this.anims.play("idle", true);
        }
    }

    // Bruges til booster — sæt hastighed udefra
    setSpeed(speed: number): void {
        this.speed = speed;
    }

    getSpeed(): number {
        return this.speed;
    }
}
```

---

## Trin 5 – Brug Player-klassen i GameScene

**5a. Tilføj import øverst i GameScene.ts:**

```ts
import { Player } from "@objects/Player";
```

**5b. Erstat player-variablerne øverst i klassen:**

```ts
// FJERN:
private player!: Phaser.Physics.Arcade.Sprite;
private speed: number = 120;
private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

// TILFØJ:
private player!: Player;
```

**5c. Fjern animationerne fra create():**  
Alle `this.anims.create({ ... })`-blokke skal slettes — de oprettes nu inde i Player-klassen.

**5d. Erstat player-spawning i create():**

```ts
// FJERN:
this.player = this.physics.add.sprite(playerX, playerY, "player", 0);
this.player.setScale(SCALE);
this.player.setCollideWorldBounds(true);
this.player.anims.play("idle");

// TILFØJ:
this.player = new Player(this, playerX, playerY, 120);
```

**5e. Opdater booster-overlap** så det bruger `setSpeed()`:

```ts
this.physics.add.overlap(this.player, boosters, (_player, booster) => {
    booster.destroy();
    this.player.setSpeed(1000);
    this.time.delayedCall(5000, () => {
        this.player.setSpeed(120);
    });
});
```

**5f. Fjern input-linjen fra create():**

```ts
// FJERN:
this.cursors = this.input.keyboard!.createCursorKeys();
```

**5g. Erstat hele update() i GameScene:**

```ts
update(): void {
    this.player.update();
    this.enemy.update();
}
```

**Tjek:** Gem og kør `npm run dev`. Alt skal virke præcist som før.
