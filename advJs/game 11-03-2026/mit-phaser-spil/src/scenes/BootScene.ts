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

  // ─── Lyde ────────────────────────────────────────────────────
  this.load.audio("coin",  "assets/audio/ribhavagrawal-coin-recieved-230517.mp3");
  this.load.audio("hurt",  "assets/audio/freesound_community-male_hurt7-48124.mp3");
  this.load.audio("music", "assets/audio/PixelHeartLoop.mp3");
  }
  create(): void {
    this.scene.start("MenuScene");
}
}