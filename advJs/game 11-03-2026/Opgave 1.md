# Dag 2 · Opgave 1 – Animationer

**Tid:** ca. 10.00 – 10.45  
**Mål:** Din spiller bevæger sig med en gang-animation og står stille med en idle-animation

---

## Inden du går i gang

Du skal have dit projekt fra dag 1 kørende:
- En spiller der kan bevæge sig rundt med piletasterne
- Kollision med vægge der virker

Du skal også bruge et **spritesheet til din spiller** — et billede med alle animationsframes.  
Find et på [kenney.nl](https://kenney.nl/assets) der passer til dit tileset, eller brug det du allerede har.

---

## Trin 1 – Find dit spiller-spritesheet

Åbn `jakobs-tilemap-viewer.html` og upload dit spiller-spritesheet.  
Sæt den rigtige `frameWidth`, `frameHeight` og `spacing`.

Kig på billedet og find ud af:
- Hvor mange frames er der per animation? (typisk 4)
- Hvilke frame-numre hører til hvilken retning?

Udfyld skemaet:

| Animation | Start-frame | Slut-frame |
|-----------|------------|------------|
| Gå ned | _____ | _____ |
| Gå venstre | _____ | _____ |
| Gå højre | _____ | _____ |
| Gå op | _____ | _____ |
| Idle (stå stille) | _____ | (kun én frame) |

---

## Trin 2 – Indlæs spritesheetet i BootScene

Åbn `src/scenes/BootScene.ts` og tilføj dit spiller-spritesheet i `preload()`:

```ts
this.load.spritesheet("player", "assets/images/player.png", {
    frameWidth: 16,   // ← ret til din frame-størrelse
    frameHeight: 16,  // ← ret til din frame-størrelse
    spacing: 1,       // ← 0 hvis ingen mellemrum
    margin: 0
});
```

> **Vigtigt:** Læg billedet i `public/assets/images/` og ret filnavnet til det rigtige.

---

## Trin 3 – Definer animationer i create()

Åbn `src/scenes/GameScene.ts` og tilføj animationerne i `create()` **før** spilleren spawnes.  
Ret frame-numrene til dem du fandt i trin 1:

```ts
// ─── Animationer ─────────────────────────────────────────────
this.anims.create({
    key: "walk-down",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }), // ← ret
    frameRate: 8,
    repeat: -1   // loop
});

this.anims.create({
    key: "walk-left",
    frames: this.anims.generateFrameNumbers("player", { start: 4, end: 7 }), // ← ret
    frameRate: 8,
    repeat: -1
});

this.anims.create({
    key: "walk-right",
    frames: this.anims.generateFrameNumbers("player", { start: 8, end: 11 }), // ← ret
    frameRate: 8,
    repeat: -1
});

this.anims.create({
    key: "walk-up",
    frames: this.anims.generateFrameNumbers("player", { start: 12, end: 15 }), // ← ret
    frameRate: 8,
    repeat: -1
});

this.anims.create({
    key: "idle",
    frames: [{ key: "player", frame: 0 }],   // ← ret til din idle-frame
    frameRate: 1
});
```

---

## Trin 4 – Brug det nye spritesheet til spilleren

Find linjen hvor din spiller spawnes og skift `"tilemap"` ud med `"player"`:

```ts
// Før:
this.player = this.physics.add.sprite(playerX, playerY, "tilemap", PLAYER_FRAME);

// Efter:
this.player = this.physics.add.sprite(playerX, playerY, "player", 0);
this.player.setScale(SCALE);
this.player.setCollideWorldBounds(true);
this.player.anims.play("idle"); // start med idle-animation
```

---

## Trin 5 – Spil animationer fra update()

Find din `update()` metode og erstat bevægelseskoden med denne version der skifter animation baseret på retning:

```ts
update(): void {
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-this.speed);
        this.player.anims.play("walk-left", true);

    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(this.speed);
        this.player.anims.play("walk-right", true);

    } else if (this.cursors.up.isDown) {
        this.player.setVelocityY(-this.speed);
        this.player.anims.play("walk-up", true);

    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(this.speed);
        this.player.anims.play("walk-down", true);

    } else {
        this.player.anims.play("idle", true);
    }
}
```

> **Bemærk:** Det andet argument `true` i `.play("walk-left", true)` betyder *ignoreIfPlaying* — animationen starter ikke forfra hvis den allerede kører. Det gør bevægelsen jævn.

---

## Trin 6 – Tjek at det virker

Kør projektet og bevæg spilleren rundt.

**Er noget galt?**

| Problem | Løsning |
|---------|---------|
| Spilleren vises ikke | Tjek at filnavnet i BootScene matcher filen i `public/assets/images/` |
| Forkerte frames vises | Tjek frame-numrene i tilemap-vieweren og ret `start`/`end` |
| Animationen er for hurtig/langsom | Juster `frameRate` — prøv 4, 8 eller 12 |
| Spilleren animerer ikke | Tjek at `this.player.anims.play(...)` er tilføjet i `update()` |
| Alle frames ser ens ud | Spritesheetet er måske ikke indlæst korrekt — tjek `spacing` og `frameWidth` |

---

## Ekstraopgave – hvis du bliver hurtigt færdig

**Dit tileset har kun én walk-retning?**  
Brug `setFlipX` så du slipper for at have separate frames for venstre og højre:

```ts
if (this.cursors.left.isDown) {
    this.player.setVelocityX(-this.speed);
    this.player.setFlipX(true);                      // spejlvend til venstre
    this.player.anims.play("walk-right", true);      // brug højre-animation

} else if (this.cursors.right.isDown) {
    this.player.setVelocityX(this.speed);
    this.player.setFlipX(false);                     // normal retning
    this.player.anims.play("walk-right", true);
}
```

---

## Du er færdig når...

- [ ] Spilleren bruger et spritesheet i stedet for en enkelt tile
- [ ] Spilleren animerer når man trykker piletasterne
- [ ] Der er en idle-animation når spilleren står stille
- [ ] Animationen skifter korrekt afhængigt af retning

---
