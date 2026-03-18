# Opsætning af udviklingsmiljø – Phaser.js + TypeScript

## Forudsætninger

Sørg for at følgende er installeret på din maskine:

- **Node.js** (v18 eller nyere)
- **VS Code** 
- En terminal (PowerShell, Terminal på Mac/Linux)

Tjek at Node er installeret korrekt:

```bash
node -v   # skal vise f.eks. v20.x.x
npm -v    # skal vise f.eks. 10.x.x
```

---

## 1. Opret projektet med Vite

Vi bruger **Vite** som build-tool – det giver hurtig hot-reload og nem TypeScript-understøttelse.

```bash
npm create vite@latest mit-phaser-spil -- --template vanilla-ts
cd mit-phaser-spil
```

---

## 2. Installer afhængigheder

```bash
npm install phaser
npm install --save-dev typescript @types/node
```

---

## 3. Installer anbefalede VS Code-udvidelser

Åbn VS Code og installer disse udvidelser (`Ctrl+Shift+X`):

| Udvidelse | Formål |
|---|---|
| **ESLint** | Fejlfinding i kode |
| **Prettier** | Auto-formatering |
| **Path Intellisense** | Autocomplete på filstier |

---

## 4. Projektstruktur

Slet de filer Vite genererer (`src/main.ts`, `src/style.css`, `src/counter.ts`) og opbyg følgende struktur:

```
mit-phaser-spil/
├── public/
│   └── assets/
│       ├── images/         # Sprites, baggrunde, tilesets
│       ├── audio/          # Musik og lydeffekter
│       └── tilemaps/       # Tiled-kort (.json)
├── src/
│   ├── scenes/
│   │   ├── BootScene.ts    # Genererer assets og starter menu
│   │   ├── MenuScene.ts    # Hovedmenu
│   │   ├── GameScene.ts    # Selve spillet
│   │   └── GameOverScene.ts
│   ├── objects/
│   │   ├── Player.ts       # Spillerklasse (til senere)
│   │   └── Enemy.ts        # Fjendeklasse (til senere)
│   ├── config/
│   │   └── gameConfig.ts   # Phaser Game-konfiguration
│   ├── types/
│   │   └── index.ts        # Delte TypeScript-typer
│   └── main.ts             # Indgangspunkt
├── index.html
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── package.json
```

---

## 5. Konfigurationsfiler

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "paths": {
      "@scenes/*": ["src/scenes/*"],
      "@objects/*": ["src/objects/*"],
      "@config/*": ["src/config/*"]
    }
  },
  "include": ["src"]
}
```

### `tsconfig.node.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

### `vite.config.ts`

```ts
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@scenes": resolve(__dirname, "src/scenes"),
      "@objects": resolve(__dirname, "src/objects"),
      "@config": resolve(__dirname, "src/config"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
  },
});
```

---

## 6. Opsæt spillet

### `src/config/gameConfig.ts`

```ts
import Phaser from "phaser";
import { BootScene } from "@scenes/BootScene";
import { MenuScene } from "@scenes/MenuScene";
import { GameScene } from "@scenes/GameScene";
import { GameOverScene } from "@scenes/GameOverScene";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,           // Bruger WebGL hvis tilgængeligt, ellers Canvas
  width: 960,
  height: 540,
  backgroundColor: "#1a1a2e",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 600 },
      debug: false,            // Sæt til true for at se hitboxes
    },
  },
  scene: [BootScene, MenuScene, GameScene, GameOverScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};
```

### `src/main.ts`

```ts
import Phaser from "phaser";
import { gameConfig } from "./config/gameConfig";

new Phaser.Game(gameConfig);
```

---

## 7. Scenes

### `src/scenes/BootScene.ts`

I stedet for at kræve billedfiler genererer vi assets programmatisk med Phaser's Graphics API – spillet virker med det samme uden nogen eksterne filer.

```ts
import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  create(): void {
    // Spiller – blå firkant
    const playerGfx = this.make.graphics({ x: 0, y: 0 });
    playerGfx.fillStyle(0x4488ff);
    playerGfx.fillRect(0, 0, 32, 48);
    playerGfx.generateTexture("spiller", 32, 48);
    playerGfx.destroy();

    // Gulv – grøn bjælke
    const groundGfx = this.make.graphics({ x: 0, y: 0 });
    groundGfx.fillStyle(0x00aa44);
    groundGfx.fillRect(0, 0, 960, 24);
    groundGfx.generateTexture("ground", 960, 24);
    groundGfx.destroy();

    // Platform-blok – mørkere grøn
    const platformGfx = this.make.graphics({ x: 0, y: 0 });
    platformGfx.fillStyle(0x007733);
    platformGfx.fillRect(0, 0, 200, 20);
    platformGfx.generateTexture("platform", 200, 20);
    platformGfx.destroy();

    // Mønt – gul cirkel
    const coinGfx = this.make.graphics({ x: 0, y: 0 });
    coinGfx.fillStyle(0xffdd00);
    coinGfx.fillCircle(10, 10, 10);
    coinGfx.generateTexture("mønt", 20, 20);
    coinGfx.destroy();

    this.scene.start("MenuScene");
  }
}
```

> Når du har rigtige sprites klar, erstat `create()` med `preload()` og brug `this.load.image(...)` i stedet.

---

### `src/scenes/MenuScene.ts`

```ts
import Phaser from "phaser";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  create(): void {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2 - 60, "MIT SPIL", {
        fontSize: "48px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    const startText = this.add
      .text(width / 2, height / 2 + 40, "Tryk ENTER for at starte", {
        fontSize: "20px",
        color: "#00ff88",
      })
      .setOrigin(0.5);

    // Blink-effekt på teksten
    this.tweens.add({
      targets: startText,
      alpha: 0,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    this.input.keyboard!.once("keydown-ENTER", () => {
      this.scene.start("GameScene");
    });
  }
}
```

---

### `src/scenes/GameScene.ts`

```ts
import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "GameScene" });
  }

  create(): void {
    // Baggrund
    this.add.rectangle(480, 270, 960, 540, 0x1a1a2e);

    // Gulv
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(480, 528, "ground");

    // Ekstra platforme
    this.platforms.create(200, 400, "platform");
    this.platforms.create(500, 300, "platform");
    this.platforms.create(750, 220, "platform");

    // Spiller
    this.player = this.physics.add.sprite(100, 400, "spiller");
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);

    // Kollision mellem spiller og platforme
    this.physics.add.collider(this.player, this.platforms);

    // Input
    this.cursors = this.input.keyboard!.createCursorKeys();

    // Score
    this.scoreText = this.add
      .text(16, 16, "Score: 0", { fontSize: "20px", color: "#ffffff" })
      .setDepth(10);

    // Kamera
    this.cameras.main.setBounds(0, 0, 960, 540);
    this.cameras.main.startFollow(this.player);
  }

  update(): void {
    const onGround = this.player.body!.blocked.down;

    // Bevægelse venstre/højre
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-220);
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(220);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
    }

    // Hop
    if (this.cursors.up.isDown && onGround) {
      this.player.setVelocityY(-550);
    }
  }

  private addScore(points: number): void {
    this.score += points;
    this.scoreText.setText(`Score: ${this.score}`);
  }
}
```

---

### `src/scenes/GameOverScene.ts`

```ts
import Phaser from "phaser";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  init(data: { score: number }): void {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2 - 60, "GAME OVER", {
        fontSize: "48px",
        color: "#ff4444",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2, `Score: ${data.score}`, {
        fontSize: "28px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    const retryText = this.add
      .text(width / 2, height / 2 + 60, "Tryk ENTER for at prøve igen", {
        fontSize: "20px",
        color: "#00ff88",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: retryText,
      alpha: 0,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    this.input.keyboard!.once("keydown-ENTER", () => {
      this.scene.start("GameScene");
    });
  }
}
```

---

## 8. Start udviklingsserveren

```bash
npm run dev
```

Åbn browseren på **[http://localhost:3000](http://localhost:3000)** – spillet loader automatisk, og siden opdateres ved hver filændring.

---

## 9. Byg til produktion

```bash
npm run build
```

Outputtet lægges i mappen `dist/` og kan uploades til f.eks. **itch.io** eller **GitHub Pages**.

---

## Hurtig overblik – vigtige Phaser-begreber

| Begreb | Forklaring |
|---|---|
| `Scene` | En "tilstand" i spillet – menu, gameplay, game over |
| `preload()` | Kører én gang – indlæs alle assets her |
| `create()` | Kører én gang efter preload – byg din verden |
| `update()` | Kører ~60 gange i sekundet – spillogik |
| `Arcade Physics` | Simpel, hurtig fysik til platformspil |
| `StaticGroup` | Faste objekter der ikke bevæger sig (platforme) |
| `Sprite` | Et objekt med grafik og evt. fysik |
| `generateTexture` | Lav en texture programmatisk uden billedfil |

---

## Docs og links

- Brug [Tiled](https://www.mapeditor.org/) til at designe levels som tilemaps
- Se den officielle dokumentation: [phaser.io/docs](https://phaser.io/docs)