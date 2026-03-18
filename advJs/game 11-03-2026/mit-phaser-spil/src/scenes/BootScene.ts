import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }
  preload(): void {
  this.load.spritesheet("tilemap", "assets/tilemaps/tilemap.png", {
      frameWidth: 32,   // ← ret til din tile-størrelse
      frameHeight: 32,  // ← ret til din tile-størrelse
      spacing: 2,       // ← 0 hvis der ikke er mellemrum
      margin: 0
  });
  this.load.spritesheet("player", "assets/spritesheets/QualitySmilePlayer.png", {
    frameWidth: 64,   // ← ret til din frame-størrelse
    frameHeight: 64,  // ← ret til din frame-størrelse
    spacing: 0,       // ← 0 hvis ingen mellemrum
    margin: 0,
  });
  this.load.spritesheet("enemy", "assets/spritesheets/SmilePlayer.png", {
    frameWidth: 32,   // ← ret til din frame-størrelse
    frameHeight: 32,  // ← ret til din frame-størrelse
    spacing: 2,       // ← 0 hvis ingen mellemrum
    margin: 0,
  });
  }
  create(): void {
    this.scene.start("MenuScene");
}
}