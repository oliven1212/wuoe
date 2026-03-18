// src/scenes/GameScene.ts
import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
    private walls!: Phaser.Physics.Arcade.StaticGroup;
    private player!: Phaser.Physics.Arcade.Sprite;  
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;  
    private items!: Phaser.Physics.Arcade.StaticGroup;  
    private score: number = 0;                          
    private scoreText!: Phaser.GameObjects.Text;        
    private speed = 220; // pixels per sekund — prøv at ændre dette
    private enemy!: Phaser.Physics.Arcade.Sprite;       // ← tilføj
    private enemies: Phaser.Physics.Arcade.Sprite[] = [];    
    private patrolLeft  = 120;                            // ← tilføj
    private patrolRight = 400;                           // ← tilføj
    private patrolSpeed = 80;                            // ← tilføj
    private isInvincible: boolean = false;               // ← tilføj
    private SCALE: number = 1.5;
    private ENEMY_FRAME = 2; // ← ret til dit frame-nummer
    private lives: number = 3;                          // ← tilføj
    private livesText!: Phaser.GameObjects.Text;        // ← tilføj
    constructor() {
        super({ key: "GameScene" });
    }
    
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
// Lav en hjælpefunktion der spawner en fjende
    private spawnEnemy = (x: number, y: number, speed: number) => {
        const e = this.physics.add.sprite(x, y, "enemy", this.ENEMY_FRAME);
        e.setScale(this.SCALE);
        e.setVelocityX(speed);
        this.physics.add.overlap(this.player, e, this.hitEnemy, undefined, this);
        this.enemies.push(e);
        return e;
    };
    create(): void {
        // ─── Kortets layout ──────────────────────────────────────────
        // Bogstaver bestemmer hvilken tile der tegnes hvor:
        // R = øvre venstre hjørne    W = øverste væg    S = øvre højre hjørne
        // O = venstre væg            . = gulv            Q = højre væg
        // T = nedre venstre hjørne   V = nederste væg   U = nedre højre hjørne
        this.isInvincible = false;
        this.score = 0;
        this.lives = 3;

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

        const TILE  = 32;   // ← din tile-størrelse i pixels
        const SCALE = 1.5;    // forstørrelse — prøv 2 eller 3

        // ─── Dine frame-numre ────────────────────────────────────────
        const FLOOR_FRAME         = 25;   // ← ret til dine numre
        const UPPER_WALL_FRAME    = 13;
        const LOWER_WALL_FRAME    = 37;
        const LEFT_WALL_FRAME     = 24;
        const RIGHT_WALL_FRAME    = 26;
        const UPPER_LEFT_CORNER   = 12;
        const UPPER_RIGHT_CORNER  = 14;
        const LOWER_LEFT_CORNER   = 36;
        const LOWER_RIGHT_CORNER  = 38;

        this.walls = this.physics.add.staticGroup();
        const mapWidth  = map[0].length * TILE * SCALE;
        const mapHeight = map.length    * TILE * SCALE;

        const offsetX = (this.scale.width  - mapWidth)  / 2;
        const offsetY = (this.scale.height - mapHeight) / 2;
        // ─── Tegn kortet tile for tile ───────────────────────────────
        map.forEach((row, rowIndex) => {
            row.split("").forEach((cell, colIndex) => {
              const x = offsetX + colIndex * TILE * SCALE + (TILE * SCALE) / 2;
              const y = offsetY + rowIndex * TILE * SCALE + (TILE * SCALE) / 2;

                // Tegn altid gulv som bund-lag

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
                else if (cell === ".") {this.add.image(x, y, "tilemap", FLOOR_FRAME).setScale(SCALE);};

                

                if (wallFrame !== null) {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", wallFrame);
                    wall.setScale(SCALE);
                    wall.refreshBody();
                    this.walls.add(wall);
                }
            });
        });
        // ─── Animationer ─────────────────────────────────────────────
        this.anims.create({ key: "walk-down",
          frames: this.anims.generateFrameNumbers("player", { start: 6, end: 8 }), // ← ret
          frameRate: 8,
          repeat: -1   // loop
        });
        this.anims.create({ key: "walk-up",
          frames: this.anims.generateFrameNumbers("player", { start: 12, end: 14 }), // ← ret
          frameRate: 8,
          repeat: -1
        });
        this.anims.create({ key: "walk-left",
          frames: this.anims.generateFrameNumbers("player", { start: 9, end: 11 }), // ← ret
          frameRate: 8,
          repeat: -1
        });
        this.anims.create({ key: "walk-right",
          frames: this.anims.generateFrameNumbers("player", { start: 3, end: 5 }), // ← ret
          frameRate: 8,
          repeat: -1
        });
        this.anims.create({ key: "walk-up-left",
          frames: this.anims.generateFrameNumbers("player", { start: 24, end: 26 }), // ← ret
          frameRate: 8,
          repeat: -1
        });
        this.anims.create({ key: "walk-up-right",
          frames: this.anims.generateFrameNumbers("player", { start: 15, end: 17 }), // ← ret
          frameRate: 8,
          repeat: -1   // loop
        });
        this.anims.create({ key: "walk-down-left",
          frames: this.anims.generateFrameNumbers("player", { start: 21, end: 23 }), // ← ret
          frameRate: 8,
          repeat: -1
});
        this.anims.create({ key: "walk-down-right",
          frames: this.anims.generateFrameNumbers("player", { start: 18, end: 20 }), // ← ret
          frameRate: 8,
          repeat: -1
        });
        this.anims.create({ key: "idle",
          frames: [{ key: "player", frame: 0 }],   // ← ret til din idle-frame
          frameRate: 1
        });
        this.anims.create({ key: "enemy-walk",
          frames: this.anims.generateFrameNumbers("enemy", { start: 1, end: 2 }), // ← ret
          frameRate: 6,
          repeat: -1
        });


        this.enemy = this.physics.add.sprite(400, 160, "enemy", this.ENEMY_FRAME);
        this.enemy.anims.play("enemy-walk");
        this.enemy.setScale(SCALE);

        // Start patruljering til venstre
        this.enemy.setVelocityX(-this.patrolSpeed);

        // ─── Spawn spiller efter kortet er tegnet ────────────────────
        // Vigtigt: spawnes sidst så spilleren tegnes øverst
        const PLAYER_START_X = 5; // ← hvilken kolonne (tæl fra 0)
        const PLAYER_START_Y = 5; // ← hvilken række (tæl fra 0)

        const playerX = PLAYER_START_X * TILE * SCALE + (TILE * SCALE) / 2;
        const playerY = PLAYER_START_Y * TILE * SCALE + (TILE * SCALE) / 2;

        this.player = this.physics.add.sprite(playerX, playerY, "player", 0);
        this.player.setScale((SCALE / 2) * (1 + this.score / 20));
        this.player.setCollideWorldBounds(true);
        this.player.anims.play("idle"); // start med idle-animation        this.player.setScale(SCALE);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.walls);
        //spawn enemies
        this.spawnEnemy(100, 160, -80);
        this.spawnEnemy(200, 200, 120);
        //enemy collider
          this.physics.add.overlap(
            this.player,
            this.enemy,
            this.hitEnemy,
            undefined,
            this
        );
        
        // ─── Kamera ──────────────────────────────────────────────────
        // Kameraet følger spilleren
        //const mapWidth  = map[0].length * TILE * SCALE;
        //const mapHeight = map.length    * TILE * SCALE;
        this.cameras.main
            .setBounds(0, 0, mapWidth, mapHeight)
            .startFollow(this.player);

        // ─── Input ───────────────────────────────────────────────────
        this.cursors = this.input.keyboard!.createCursorKeys();

        // ─── Items ───────────────────────────────────────────────────
        const ITEM_FRAME = 93; // ← ret til dit frame-nummer

        this.items = this.physics.add.staticGroup();

        // Placer items på specifikke tile-koordinater
        // Format: [kolonne, række] — tæl fra 0 i dit map-array
        const itemPositions = [
            [3, 2],
            [8, 4],
            [5, 7],
            [11, 3],
            [5, 6],
        ];

        itemPositions.forEach(([col, row]) => {
            const x = col * TILE * SCALE + (TILE * SCALE) / 2;
            const y = row * TILE * SCALE + (TILE * SCALE) / 2;
            const item = this.items.create(x, y, "tilemap", ITEM_FRAME);
            item.setScale(SCALE);
            item.refreshBody();
            item.setData("points", 10); // ← gem point-værdien



        });
        

        // ─── Overlap: spiller samler item op ─────────────────────────
        this.physics.add.overlap(
          this.player,
            this.items,
            (_player, item) => {
              // I overlap-funktionen:
              const points = (item as Phaser.Physics.Arcade.Sprite).getData("points");
              this.score += points;
              this.player.setScale((SCALE / 2) * (1 + this.score / 20));
              (item as Phaser.Physics.Arcade.Sprite).destroy();

            }
        );

        // ─── UI: score og liv ────────────────────────────────────────
        this.livesText = this.add.text(16, 50, "❤️ ❤️ ❤️", {
            fontSize: "18px",
            backgroundColor: "#000000",
            padding: { x: 8, y: 4 }
        }).setScrollFactor(0);
        
        // ─── Score-tekst ─────────────────────────────────────────────
        // setScrollFactor(0) fastgør teksten til skærmen — ikke verden
        this.scoreText = this.add.text(16, 16, "Score: 0", {
            fontSize: "18px",
            color: "#ffffff",
            backgroundColor: "#000000",
            padding: { x: 8, y: 4 }
        }).setScrollFactor(0);



    }

    update(): void {

      // Nulstil hastighed hver frame
      const diagonalSpeed = this.speed / Math.sqrt(2);

      this.player.setVelocity(0);
      switch (true) {
        case this.cursors.up.isDown && this.cursors.left.isDown:
          this.player.setVelocityX(-diagonalSpeed);
          this.player.setVelocityY(-diagonalSpeed);
          this.player.anims.play("walk-up-left", true);
          break;

        case this.cursors.up.isDown && this.cursors.right.isDown:
          this.player.setVelocityX(diagonalSpeed);
          this.player.setVelocityY(-diagonalSpeed);
          this.player.anims.play("walk-up-right", true);
          break;

        case this.cursors.down.isDown && this.cursors.left.isDown:
          this.player.setVelocityX(-diagonalSpeed);
          this.player.setVelocityY(diagonalSpeed);
          this.player.anims.play("walk-down-left", true);
          break;

        case this.cursors.down.isDown && this.cursors.right.isDown:
          this.player.setVelocityX(diagonalSpeed);
          this.player.setVelocityY(diagonalSpeed);
          this.player.anims.play("walk-down-right", true);
          break;

        case this.cursors.up.isDown:
          this.player.setVelocityY(-this.speed);
          this.player.anims.play("walk-up", true);
          break;

        case this.cursors.down.isDown:
          this.player.setVelocityY(this.speed);
          this.player.anims.play("walk-down", true);
          break;

        case this.cursors.left.isDown:
          this.player.setVelocityX(-this.speed);
          this.player.anims.play("walk-left", true);
          break;

        case this.cursors.right.isDown:
          this.player.setVelocityX(this.speed);
          this.player.anims.play("walk-right", true);
          break;

        default:
          this.player.anims.play("idle", true);
      }
      // I create() — efter items er placeret:
      this.scoreText.setText(
          "Score: 0  |  Items tilbage: " + this.items.countActive()
      );

      // I overlap-funktionen:
      this.scoreText.setText(
          "Score: " + this.score + "  |  Items tilbage: " + this.items.countActive()
      );
      // ─── Fjende patruljering ──────────────────────────────────────
        if (this.enemy.x >= this.patrolRight) {
            this.enemy.setVelocityX(-this.patrolSpeed); // vend til venstre
            this.enemy.setFlipX(true);
        }
        if (this.enemy.x <= this.patrolLeft) {
            this.enemy.setVelocityX(this.patrolSpeed);  // vend til højre
            this.enemy.setFlipX(false);
        }

        this.enemies.forEach(enemy => {
          let vx: number = 0;
          if(enemy.body){
            vx = enemy.body.velocity.x;
          }else{
            return;
          }
          if (enemy.x >= this.patrolRight) {
            enemy.setVelocityX(vx > 0 ? -vx : vx); // vend til venstre
            enemy.setFlipX(true);
          }
          if (enemy.x <= this.patrolLeft) {
            enemy.setVelocityX(vx > 0 ? vx : -vx);  // vend til højre
            enemy.setFlipX(false);
          }
        });


        if (this.items.countActive() === 0) {
    this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "Du vandt! 🎉",
        { fontSize: "32px", color: "#00E5A0" }
    ).setOrigin(0.5).setScrollFactor(0);
}
    }
    
    
}