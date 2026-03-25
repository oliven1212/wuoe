// src/scenes/GameScene.ts
import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
    public score: number = 0;                          
    public SCALE: number = 1.5;
    public music!: Phaser.Sound.BaseSound;

    
    

    create(): void {
        
    }

    update(): void {
      
    }
    
    shutdown(): void {
      // Stoppes automatisk når scenen lukkes
      if (this.music) {
          this.music.stop();
      }
    }
}

