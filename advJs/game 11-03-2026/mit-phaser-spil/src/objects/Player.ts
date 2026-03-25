// src/objects/Player.ts
import Phaser from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
    private speed: number;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number, speed: number = 180) {
        super(scene, x, y, "player", 0); // ← ret "player" til din texture

        // Registrer i scenen og physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = speed;
        this.setScale(1.5 / 2); // ← ret til din SCALE-værdi
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
        scene.anims.create({ key: "walk-down",
            frames: scene.anims.generateFrameNumbers("player", { start: 6, end: 8 }),
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({ key: "walk-left",
            frames: scene.anims.generateFrameNumbers("player", { start: 9, end: 11 }),
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({ key: "walk-right",
            frames: scene.anims.generateFrameNumbers("player", { start: 3, end: 5 }),
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({ key: "walk-up",
            frames: scene.anims.generateFrameNumbers("player", { start: 12, end: 14 }),
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({ key: "walk-up-left",
          frames: scene.anims.generateFrameNumbers("player", { start: 24, end: 26 }), // ← ret
          frameRate: 8,
          repeat: -1
        });

        scene.anims.create({ key: "walk-up-right",
          frames: scene.anims.generateFrameNumbers("player", { start: 15, end: 17 }), // ← ret
          frameRate: 8,
          repeat: -1   // loop
        });

        scene.anims.create({ key: "walk-down-left",
          frames: scene.anims.generateFrameNumbers("player", { start: 21, end: 23 }), // ← ret
          frameRate: 8,
          repeat: -1
        });

        scene.anims.create({ key: "walk-down-right",
          frames: scene.anims.generateFrameNumbers("player", { start: 18, end: 20 }), // ← ret
          frameRate: 8,
          repeat: -1
        });

        scene.anims.create({ key: "idle",
            frames: [{ key: "player", frame: 0 }],
            frameRate: 1
        });
    }

    update(): void {
        const diagonalSpeed = this.speed / Math.sqrt(2);

        this.setVelocity(0);
        switch (true) {
            case this.cursors.up.isDown && this.cursors.left.isDown:
            this.setVelocityX(-diagonalSpeed);
            this.setVelocityY(-diagonalSpeed);
            this.anims.play("walk-up-left", true);
            break;

            case this.cursors.up.isDown && this.cursors.right.isDown:
            this.setVelocityX(diagonalSpeed);
            this.setVelocityY(-diagonalSpeed);
            this.anims.play("walk-up-right", true);
            break;

            case this.cursors.down.isDown && this.cursors.left.isDown:
            this.setVelocityX(-diagonalSpeed);
            this.setVelocityY(diagonalSpeed);
            this.anims.play("walk-down-left", true);
            break;

            case this.cursors.down.isDown && this.cursors.right.isDown:
            this.setVelocityX(diagonalSpeed);
            this.setVelocityY(diagonalSpeed);
            this.anims.play("walk-down-right", true);
            break;

            case this.cursors.up.isDown:
            this.setVelocityY(-this.speed);
            this.anims.play("walk-up", true);
            break;

            case this.cursors.down.isDown:
            this.setVelocityY(this.speed);
            this.anims.play("walk-down", true);
            break;

            case this.cursors.left.isDown:
            this.setVelocityX(-this.speed);
            this.anims.play("walk-left", true);
            break;

            case this.cursors.right.isDown:
            this.setVelocityX(this.speed);
            this.anims.play("walk-right", true);
            break;

            default:
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