// src/scenes/GameScene.ts
import Phaser from "phaser";
import { GameScene } from "@scenes/GameScene";
import { Enemy } from "@objects/Enemy";
import { Player } from "@objects/Player";


export class Room1Scene extends GameScene {
    private player!: Player;
    private walls!: Phaser.Physics.Arcade.StaticGroup;
    private items!: Phaser.Physics.Arcade.StaticGroup;  
    private scoreText!: Phaser.GameObjects.Text;        
    private enemies: Enemy[] = [];    
    private isInvincible: boolean = false;               // ← tilføj
    private lives: number = 3;                          // ← tilføj
    private livesText!: Phaser.GameObjects.Text;        // ← tilføj
    private coinSound!: Phaser.Sound.BaseSound;   // ← tilføj
    private hurtSound!: Phaser.Sound.BaseSound;   // ← tilføj
    private PLAYER_START_X = 5; // ← hvilken kolonne (tæl fra 0)
    private PLAYER_START_Y = 5; // ← hvilken række (tæl fra 0)
    private doors!: Phaser.Physics.Arcade.StaticGroup;
    constructor() {
        super({ key: "Room1Scene" });
    }
    
    private hitEnemy(): void {
      if (this.isInvincible) return;

      this.lives--;
      this.hurtSound.play(); // ← tilføj denne linje
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
      const e = new Enemy(
          this,          // scene
          x,           // x — ret til dit tal
          y,           // y — ret til dit tal
          "enemy",     // texture — ret til din fjende-texture
          2,             // frame — ret til dit frame-nummer
          180,            // patrolLeft — ret til dit tal
          430,           // patrolRight — ret til dit tal
          speed             // patrolSpeed — ret til dit tal
      );
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
            "O...........D..Q",
            "O..............Q",
            "TVVVVVVVVVVVVVVU",
        ];

        const TILE  = 32;   // ← din tile-størrelse i pixels
        // Vigtigt: spawnes sidst så spilleren tegnes øverst

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
        const DOOR_FRAME = 103;

        this.walls = this.physics.add.staticGroup();
        this.doors = this.physics.add.staticGroup();
        const mapWidth  = map[0].length * TILE * this.SCALE;
        const mapHeight = map.length    * TILE * this.SCALE;

        const offsetX = (this.scale.width  - mapWidth)  / 2;
        const offsetY = (this.scale.height - mapHeight) / 2;
        // ─── Tegn kortet tile for tile ───────────────────────────────
        map.forEach((row, rowIndex) => {
            row.split("").forEach((cell, colIndex) => {
              const x = offsetX + colIndex * TILE * this.SCALE + (TILE * this.SCALE) / 2;
              const y = offsetY + rowIndex * TILE * this.SCALE + (TILE * this.SCALE) / 2;

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

                else if (cell === "D") {
                  this.add.image(x, y, "tilemap", FLOOR_FRAME).setScale(this.SCALE);

                  const door = this.physics.add.staticSprite(x, y, "tilemap", DOOR_FRAME);
                  door.setScale(this.SCALE);
                  door.refreshBody();

                  this.doors.add(door);
                }

                else if (cell === ".") {this.add.image(x, y, "tilemap", FLOOR_FRAME).setScale(this.SCALE);};

                

                if (wallFrame !== null) {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", wallFrame);
                    wall.setScale(this.SCALE);
                    wall.refreshBody();
                    this.walls.add(wall);
                }
            });
        });

        // ─── Spawn spiller efter kortet er tegnet ────────────────────
        // Vigtigt: spawnes sidst så spilleren tegnes øverst
        const playerX = this.PLAYER_START_X * TILE * this.SCALE + (TILE * this.SCALE) / 2;
        const playerY = this.PLAYER_START_Y * TILE * this.SCALE + (TILE * this.SCALE) / 2;
        this.player = new Player(this, playerX, playerY, 180);


        this.physics.add.collider(this.player, this.walls);
        this.physics.add.overlap(this.player, this.doors,
          () => {
            this.scene.start("Room2Scene", { score: this.score });
          },
          undefined,
          this
        );
        //spawn enemies
        this.spawnEnemy(250, 100, -160);
        this.spawnEnemy(200, 200, 120);
        //enemy collider
        this.enemies.forEach(enemy => {
            this.physics.add.overlap(
              this.player,
              enemy,
              this.hitEnemy,
              undefined,
              this
        );
        });
   
        
        // ─── Kamera ──────────────────────────────────────────────────
        // Kameraet følger spilleren
        //const mapWidth  = map[0].length * TILE * SCALE;
        //const mapHeight = map.length    * TILE * SCALE;
        this.cameras.main
            .setBounds(0, 0, mapWidth, mapHeight)
            .startFollow(this.player);

        // ─── Lyd ─────────────────────────────────────────────────────
        this.coinSound = this.sound.add("coin",  { volume: 0.5 });
        this.hurtSound = this.sound.add("hurt",  { volume: 0.6 });
        this.music     = this.sound.add("music", { volume: 0.2, loop: true });

        // Start baggrundsmusik
        this.music.play();


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
            const x = col * TILE * this.SCALE + (TILE * this.SCALE) / 2;
            const y = row * TILE * this.SCALE + (TILE * this.SCALE) / 2;
            const item = this.items.create(x, y, "tilemap", ITEM_FRAME);
            item.setScale(this.SCALE);
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
              this.scoreText.setText("Score: " + this.score);
              this.coinSound.play(); // ← tilføj denne linje
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
      this.player.update();
      this.enemies.forEach(e => {
        e.update();
      });

      // Nulstil hastighed hver frame
      
      // I create() — efter items er placeret:
      this.scoreText.setText(
          "Score: 0  |  Items tilbage: " + this.items.countActive()
      );

      // I overlap-funktionen:
      this.scoreText.setText(
          "Score: " + this.score + "  |  Items tilbage: " + this.items.countActive()
      );

       


        if (this.items.countActive() === 0) {
    this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "Du vandt! 🎉",
        { fontSize: "32px", color: "#00E5A0" }
    ).setOrigin(0.5).setScrollFactor(0);
}
    }
    
    shutdown(): void {
      // Stoppes automatisk når scenen lukkes
      if (this.music) {
          this.music.stop();
      }
    }
}

