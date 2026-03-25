// src/scenes/Room2Scene.ts
import Phaser from "phaser";
import { GameScene } from "@scenes/GameScene";
import { Player } from "@objects/Player";


export class Room2Scene extends GameScene {
    private player!: Player;

    constructor() {
        super({ key: "Room2Scene" });
    }

    init(data: { score: number }): void {
        // Modtag score fra Room1Scene
        this.score = data.score ?? 0;
    }

    create(): void {
        const TILE  = 32;

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

        const walls = this.physics.add.staticGroup();
        let playerX = 0;
        let playerY = 0;

        map.forEach((row, rowIndex) => {
            row.split("").forEach((cell, colIndex) => {
                const x = colIndex * TILE * this.SCALE + (TILE * this.SCALE) / 2;
                const y = rowIndex * TILE * this.SCALE + (TILE * this.SCALE) / 2;

                if (cell === "U") {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", LOWER_RIGHT_CORNER);
                    wall.setScale(this.SCALE); wall.refreshBody(); walls.add(wall);
                } else if (cell === "T") {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", LOWER_LEFT_CORNER);
                    wall.setScale(this.SCALE); wall.refreshBody(); walls.add(wall);
                } else if (cell === "S") {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", UPPER_RIGHT_CORNER);
                    wall.setScale(this.SCALE); wall.refreshBody(); walls.add(wall);
                } else if (cell === "R") {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", UPPER_LEFT_CORNER);
                    wall.setScale(this.SCALE); wall.refreshBody(); walls.add(wall);
                } else if (cell === "W") {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", UPPER_WALL_FRAME);
                    wall.setScale(this.SCALE); wall.refreshBody(); walls.add(wall);
                } else if (cell === "V") {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", LOWER_WALL_FRAME);
                    wall.setScale(this.SCALE); wall.refreshBody(); walls.add(wall);
                } else if (cell === "O") {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", LEFT_WALL_FRAME);
                    wall.setScale(this.SCALE); wall.refreshBody(); walls.add(wall);
                } else if (cell === "Q") {
                    const wall = this.physics.add.staticSprite(x, y, "tilemap", RIGHT_WALL_FRAME);
                    wall.setScale(this.SCALE); wall.refreshBody(); walls.add(wall);
                } else {
                    this.add.image(x, y, "tilemap", FLOOR_FRAME).setScale(this.SCALE);
                    if (cell === "P") {
                        playerX = x;
                        playerY = y;
                    }
                }
            });
        });

        // ─── Spiller ─────────────────────────────────────────────────
        this.player = new Player(this, playerX, playerY, 180);
        

        this.physics.add.collider(this.player, walls);

        // ─── Kamera ──────────────────────────────────────────────────
        const mapWidth  = map[0].length * TILE * this.SCALE;
        const mapHeight = map.length    * TILE * this.SCALE;
        this.cameras.main
            .setBounds(0, 0, mapWidth, mapHeight)
            .startFollow(this.player);

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
    }
    update(): void {
      this.player.update();
      
    }

    
}