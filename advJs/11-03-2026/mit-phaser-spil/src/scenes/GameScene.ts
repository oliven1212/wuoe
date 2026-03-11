// src/scenes/GameScene.ts
import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
    private walls!: Phaser.Physics.Arcade.StaticGroup;
    private player!: Phaser.Physics.Arcade.Sprite;  
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;  
    private items!: Phaser.Physics.Arcade.StaticGroup;  
    private score: number = 0;                          
    private scoreText!: Phaser.GameObjects.Text;        

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
        // ─── Spawn spiller efter kortet er tegnet ────────────────────
        // Vigtigt: spawnes sidst så spilleren tegnes øverst
        const PLAYER_FRAME = 132;   // ← ret til dit frame-nummer
        const PLAYER_START_X = 5; // ← hvilken kolonne (tæl fra 0)
        const PLAYER_START_Y = 5; // ← hvilken række (tæl fra 0)

        const px = PLAYER_START_X * TILE * SCALE + (TILE * SCALE) / 2;
        const py = PLAYER_START_Y * TILE * SCALE + (TILE * SCALE) / 2;

        this.player = this.physics.add.sprite(px, py, "tilemap", PLAYER_FRAME);
        this.player.setScale(SCALE);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.walls);

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
              (item as Phaser.Physics.Arcade.Sprite).destroy();

                // Tjek om alle items er samlet op
                if (this.items.countActive() === 0) {
                    this.add.text(
                        this.cameras.main.centerX,
                        this.cameras.main.centerY,
                        "Du vandt!",
                        { fontSize: "64px", color: "#ff00d9" }
                    ).setOrigin(0.5).setScrollFactor(0);
                }
            }
        );
        
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
      const speed = 220; // pixels per sekund — prøv at ændre dette
      const PLAYER_FRAME_DEFAULT = 132;
      const PLAYER_FRAME_LEFT = 136;
      const PLAYER_FRAME_RIGHT = 134;
      const PLAYER_FRAME_UP = 133;
      const PLAYER_FRAME_DOWN = 135;
      const PLAYER_FRAME_LEFT_UP = 137;
      const PLAYER_FRAME_RIGHT_UP = 138;
      const PLAYER_FRAME_LEFT_DOWN = 140;
      const PLAYER_FRAME_RIGHT_DOWN = 139;

      // Nulstil hastighed hver frame
      this.player.setVelocity(0);
      const vx = (this.cursors.left.isDown ? -1 : 0) + (this.cursors.right.isDown ? 1 : 0);
      const vy = (this.cursors.up.isDown   ? -1 : 0) + (this.cursors.down.isDown  ? 1 : 0);
      const len = Math.sqrt(vx * vx + vy * vy) || 1;

      this.player.setVelocityX((vx / len) * speed);
      this.player.setVelocityY((vy / len) * speed);

      switch (true) {
        case this.cursors.up.isDown && this.cursors.left.isDown:
          this.player.setFrame(PLAYER_FRAME_LEFT_UP);
          break;

        case this.cursors.up.isDown && this.cursors.right.isDown:
          this.player.setFrame(PLAYER_FRAME_RIGHT_UP);
          break;

        case this.cursors.down.isDown && this.cursors.left.isDown:
          this.player.setFrame(PLAYER_FRAME_LEFT_DOWN);
          break;

        case this.cursors.down.isDown && this.cursors.right.isDown:
          this.player.setFrame(PLAYER_FRAME_RIGHT_DOWN);
          break;

        case this.cursors.up.isDown:
          this.player.setFrame(PLAYER_FRAME_UP);
          break;

        case this.cursors.down.isDown:
          this.player.setFrame(PLAYER_FRAME_DOWN);
          break;

        case this.cursors.left.isDown:
          this.player.setFrame(PLAYER_FRAME_LEFT);
          break;

        case this.cursors.right.isDown:
          this.player.setFrame(PLAYER_FRAME_RIGHT);
          break;

        default:
          this.player.setFrame(PLAYER_FRAME_DEFAULT);
      }
      // I create() — efter items er placeret:
      this.scoreText.setText(
          "Score: 0  |  Items tilbage: " + this.items.countActive()
      );

      // I overlap-funktionen:
      this.scoreText.setText(
          "Score: " + this.score + "  |  Items tilbage: " + this.items.countActive()
      );
    }
}