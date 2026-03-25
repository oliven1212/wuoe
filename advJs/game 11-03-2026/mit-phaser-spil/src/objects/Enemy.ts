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

        this.setScale(1.5); // ← ret til din SCALE-værdi
        this.setVelocityX(patrolSpeed);

        // Opret animationer
        this.createAnimations(scene);

        // Start med idle-animation
        this.anims.play("enemy-walk");
        if(patrolSpeed < 0){
            this.setFlipX(true);
        }


    }

    private createAnimations(scene: Phaser.Scene): void {
            // Tjek om animationerne allerede er oprettet
            // (vigtigt ved scene-genstart)
            if (scene.anims.exists("enemy-walk")) return;
    
            scene.anims.create({ key: "enemy-walk",
                frames: scene.anims.generateFrameNumbers("enemy", { start: 1, end: 2 }), // ← ret
                frameRate: 6,
                repeat: -1
            });
        }


    update(): void {
        let vx: number = 0;
            if(this.body){
                vx = this.body.velocity.x;
            }else{
                return;
            }
        if (this.x >= this.patrolRight) {
            this.setVelocityX(vx > 0 ? -vx : vx); // vend til venstre
            this.setFlipX(true);
          }
          if (this.x <= this.patrolLeft) {
            this.setVelocityX(vx > 0 ? vx : -vx);  // vend til højre
            this.setFlipX(false);
          }
    }
}