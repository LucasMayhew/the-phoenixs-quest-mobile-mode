namespace SpriteKind {
    export const Particle = SpriteKind.create()
    export const Save = SpriteKind.create()
    export const LevelPicker = SpriteKind.create()
    export const LevelTile = SpriteKind.create()
    export const trash = SpriteKind.create()
    export const Boss = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(level_selecting) && (!(lock_controls) && (the_player_hitbox && the_player_hitbox.isHittingTile(CollisionDirection.Bottom)))) {
        spriteutils.jumpImpulse(the_player_hitbox, 34)
    }
})
function play_level_3 () {
    scene.setBackgroundImage(assets.image`level_3_background`)
    scene.setBackgroundColor(9)
    tiles.loadMap(tiles.createMap(tilemap`level_3`))
    tiles.placeOnRandomTile(the_player_hitbox, assets.tile`start`)
    tiles.setTileAt(tiles.getTilesByType(assets.tile`start`)[0], assets.tile`transparency16`)
    next_level_loc = tiles.getTilesByType(assets.tile`next_level_tile`)[0]
    tiles.setTileAt(next_level_loc, assets.tile`transparency16`)
    show_particles = true
    fade_out(false)
    enable_controls(true)
    while (true) {
        player_loc = tiles.locationOfSprite(the_player_hitbox)
        if (tiles.locationXY(player_loc, tiles.XY.column) == tiles.locationXY(next_level_loc, tiles.XY.column) && tiles.locationXY(player_loc, tiles.XY.row) == tiles.locationXY(next_level_loc, tiles.XY.row)) {
            break;
        }
        pause(1)
    }
    enable_controls(false)
    story.printCharacterText("What's this?", blockSettings.readString("save_" + save_num + "_name"))
    scene.cameraShake(4, 1000)
    story.printCharacterText("Who are you???", "??????")
    story.printCharacterText("My name is " + blockSettings.readString("save_" + save_num + "_name") + ".", blockSettings.readString("save_" + save_num + "_name"))
    story.printCharacterText("I am the phoenix who guards the Earth!", "??????")
    story.printCharacterText("But I have been gone for a long time.", "Phoenix")
    story.printCharacterText("The world has been polluted, filled with garbage, and being slowly decayed by your kind!", "Phoenix")
    story.printCharacterText("I can't fix it myself, since I'm in another galaxy far far away fighting in another great war.", "Phoenix")
    story.printCharacterText("Your mission is to clean up the world.", "Phoenix")
    story.printCharacterText("But the world is a really big place - how could one person do it???", blockSettings.readString("save_" + save_num + "_name"))
    story.printCharacterText("Oh that's true...", "Phoenix")
    story.printCharacterText("Then just clean up your local area. I'll get more people to do it as well in other areas. ", "Phoenix")
    story.printCharacterText("The beach down to the south is in need of your help. ", "Phoenix")
    story.printCharacterText("Now go!!!!", "Phoenix")
    fade_in(true)
    show_particles = false
    clear_particles()
    return true
}
function title_screen () {
    scene.setBackgroundImage(assets.image`title_screen_background`)
    tiles.loadMap(tiles.createMap(tilemap`title_screen_map`))
    title_top = textsprite.create("The Phoenix's Quest")
    title_top.setOutline(1, 8)
    title_top.setFlag(SpriteFlag.Ghost, true)
    title_top.setPosition(scene.screenWidth() / 2, scene.screenHeight() * 0.1)
    title_top.z = 2
    title_by = textsprite.create("By LucasMayhew")
    title_by.setOutline(1, 6)
    title_by.setFlag(SpriteFlag.Ghost, true)
    title_by.setPosition(scene.screenWidth() / 2, scene.screenHeight() * 0.65)
    title_by.z = 2
    title_by_2row = textsprite.create("and UnsignedArduino")
    title_by_2row.setOutline(1, 6)
    title_by_2row.setFlag(SpriteFlag.Ghost, true)
    title_by_2row.setPosition(scene.screenWidth() / 2, scene.screenHeight() * 0.75)
    title_by_2row.z = 2
    title_bottom = textsprite.create("Press A to begin")
    title_bottom.setOutline(1, 7)
    title_bottom.setFlag(SpriteFlag.Ghost, true)
    title_bottom.setPosition(scene.screenWidth() / 2, scene.screenHeight() * 0.9)
    title_bottom.z = 2
    title_shader = shader.createImageShaderSprite(assets.image`title_screen_shader`, shader.ShadeLevel.One)
    title_shader.setPosition(scene.screenWidth() / 2, scene.screenHeight() / 2)
    title_shader.setFlag(SpriteFlag.Ghost, true)
    title_shader.z = 1
    show_particles = true
    fade_out(true)
    while (!(controller.A.isPressed())) {
        pause(1)
    }
    fade_in(true)
    show_particles = false
    title_top.destroy()
    title_bottom.destroy()
    title_by.destroy()
    title_by_2row.destroy()
    title_shader.destroy()
    clear_particles()
}
function play_level_5 () {
    scene.setBackgroundImage(assets.image`level_5_background`)
    scene.setBackgroundColor(9)
    tiles.loadMap(tiles.createMap(tilemap`level_5`))
    tiles.placeOnRandomTile(the_player_hitbox, assets.tile`start`)
    tiles.setTileAt(tiles.getTilesByType(assets.tile`start`)[0], assets.tile`transparency16`)
    for (let location of tiles.getTilesByType(assets.tile`myTile10`)) {
        trash_thing = sprites.create(get_trash_image(), SpriteKind.trash)
        tiles.placeOnTile(trash_thing, location)
        tiles.setTileAt(location, assets.tile`myTile8`)
    }
    for (let location of tiles.getTilesByType(assets.tile`myTile11`)) {
        trash_thing = sprites.create(get_trash_image(), SpriteKind.trash)
        tiles.placeOnTile(trash_thing, location)
        tiles.setTileAt(location, assets.tile`transparency16`)
    }
    the_player_health = statusbars.create(16, 2, StatusBarKind.Health)
    the_player_health.max = 10
    the_player_health.value = the_player_health.max
    the_player_health.attachToSprite(the_player_hitbox, 0, 0)
    the_player_health.setColor(7, 2)
    fade_out(false)
    enable_controls(true)
    while (sprites.allOfKind(SpriteKind.trash).length > 0) {
        for (let trash_thing of sprites.allOfKind(SpriteKind.trash)) {
            if (the_player_hitbox.overlapsWith(trash_thing)) {
                if (player_attacking) {
                    trash_thing.destroy()
                } else {
                    timer.throttle("take_damage", 500, function () {
                        the_player_health.value += -1
                    })
                    if (the_player_health.value <= 0) {
                        timer.background(function () {
                            story.printCharacterText("NOOOOOOOOOOOOOOOOOOOOOOOO", blockSettings.readString("save_" + save_num + "_name"))
                        })
                        enable_controls(false)
                        fade_in(true)
                        story.clearAllText()
                        tiles.destroySpritesOfKind(SpriteKind.trash)
                        return false
                    }
                }
            } else {
                if (spriteutils.distanceBetween(the_player_hitbox, trash_thing) < 64) {
                    trash_thing.follow(the_player_hitbox, 20)
                    trash_thing.ay = 0
                } else {
                    trash_thing.follow(the_player_hitbox, 0)
                    trash_thing.ay = GRAVITY
                }
            }
        }
        pause(1)
    }
    enable_controls(false)
    fade_in(true)
    return true
}
function play_level_7 () {
    scene.setBackgroundImage(assets.image`level_4_background`)
    scene.setBackgroundColor(9)
    tiles.loadMap(tiles.createMap(tilemap`level_7`))
    tiles.placeOnRandomTile(the_player_hitbox, assets.tile`start`)
    tiles.setTileAt(tiles.getTilesByType(assets.tile`start`)[0], assets.tile`transparency16`)
    for (let location of tiles.getTilesByType(assets.tile`myTile11`)) {
        trash_thing = sprites.create(get_trash_image(), SpriteKind.trash)
        tiles.placeOnTile(trash_thing, location)
        tiles.setTileAt(location, assets.tile`transparency16`)
    }
    for (let location of tiles.getTilesByType(assets.tile`myTile28`)) {
        trash_thing = sprites.create(assets.image`smoke`, SpriteKind.trash)
        tiles.placeOnTile(trash_thing, location)
        tiles.setTileAt(location, assets.tile`transparency16`)
    }
    trash_start_time = game.runtime()
    trash_timer = textsprite.create("Time left: ", 0, 15)
    trash_timer.bottom = scene.screenHeight() - 4
    trash_timer.left = 4
    trash_timer.setFlag(SpriteFlag.RelativeToCamera, true)
    fade_out(false)
    enable_controls(true)
    while (sprites.allOfKind(SpriteKind.trash).length > 0) {
        for (let trash_thing of sprites.allOfKind(SpriteKind.trash)) {
            if (the_player_hitbox.overlapsWith(trash_thing)) {
                trash_thing.destroy()
            }
        }
        if (game.runtime() - trash_start_time >= 47000) {
            trash_timer.setText("Time's up!")
            enable_controls(false)
            fade_in(true)
            tiles.destroySpritesOfKind(SpriteKind.trash)
            trash_timer.destroy()
            return false
        } else {
            trash_timer.setText("Time left: " + (47000 - (game.runtime() - trash_start_time)) / 1000 + "s")
        }
        pause(1)
    }
    enable_controls(false)
    fade_in(true)
    trash_timer.destroy()
    return true
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    story.clearAllText()
})
function play_level_2 () {
    scene.setBackgroundImage(assets.image`level_2_background`)
    scene.setBackgroundColor(9)
    tiles.loadMap(tiles.createMap(tilemap`level_2`))
    tiles.placeOnRandomTile(the_player_hitbox, assets.tile`start`)
    tiles.setTileAt(tiles.getTilesByType(assets.tile`start`)[0], assets.tile`transparency16`)
    next_level_loc = tiles.getTilesByType(assets.tile`next_level_tile`)[0]
    tiles.setTileAt(next_level_loc, assets.tile`transparency16`)
    fade_out(false)
    enable_controls(true)
    while (true) {
        player_loc = tiles.locationOfSprite(the_player_hitbox)
        if (tiles.locationXY(player_loc, tiles.XY.column) == tiles.locationXY(next_level_loc, tiles.XY.column) && tiles.locationXY(player_loc, tiles.XY.row) == tiles.locationXY(next_level_loc, tiles.XY.row)) {
            break;
        }
        pause(1)
    }
    enable_controls(false)
    fade_in(true)
    return true
}
function clear_particles () {
    for (let particle of sprites.allOfKind(SpriteKind.Particle)) {
        particle.destroy()
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(level_selecting) && (the_player && !(lock_controls))) {
        player_attack()
    }
})
function play_level_6 () {
    scene.setBackgroundImage(assets.image`level_6_background`)
    scene.setBackgroundColor(9)
    tiles.loadMap(tiles.createMap(tilemap`level_6`))
    tiles.placeOnRandomTile(the_player_hitbox, assets.tile`start`)
    tiles.setTileAt(tiles.getTilesByType(assets.tile`start`)[0], assets.tile`transparency16`)
    the_player_health = statusbars.create(16, 2, StatusBarKind.Health)
    the_player_health.max = 20
    the_player_health.value = the_player_health.max
    the_player_health.attachToSprite(the_player_hitbox, 0, 0)
    the_player_health.setColor(7, 2)
    boss = sprites.create(assets.image`boss`, SpriteKind.Boss)
    boss.z = 0.5
    tiles.placeOnRandomTile(boss, assets.tile`boss_tile`)
    tiles.setTileAt(tiles.getTilesByType(assets.tile`boss_tile`)[0], assets.tile`transparency16`)
    boss_health = statusbars.create(16, 2, StatusBarKind.Health)
    boss_health.max = 50
    boss_health.value = boss_health.max
    boss_health.attachToSprite(boss, 0, 0)
    boss_health.setColor(7, 2)
    fade_out(false)
    enable_controls(true)
    while (sprites.allOfKind(SpriteKind.Boss).length > 0) {
        for (let trash_thing of sprites.allOfKind(SpriteKind.trash)) {
            if (the_player_hitbox.overlapsWith(trash_thing)) {
                if (player_attacking) {
                    trash_thing.destroy()
                } else {
                    timer.throttle("take_damage", 500, function () {
                        the_player_health.value += -1
                    })
                }
            }
        }
        if (the_player_hitbox.overlapsWith(boss)) {
            if (player_attacking) {
                timer.throttle("boss_take_damage", 500, function () {
                    boss_health.value += -1
                })
            }
        }
        timer.throttle("boss_summon_enemy", 15000, function () {
            timer.background(function () {
                story.spriteMoveToLocation(boss, boss.x, boss.y - tiles.tileWidth() * 3, 20)
                for (let index = 0; index < 5; index++) {
                    pause(1000)
                    if (spriteutils.isDestroyed(boss)) {
                        break;
                    }
                    trash_thing = sprites.create(get_trash_image(), SpriteKind.trash)
                    trash_thing.setPosition(boss.x, boss.y)
                    trash_thing.z = 0.25
                    trash_thing.follow(the_player_hitbox, 20)
                    if (boss_health.value < boss_health.max / 2) {
                        timer.after(500, function () {
                            trash_thing = sprites.create(get_trash_image(), SpriteKind.trash)
                            trash_thing.setPosition(boss.x, boss.y)
                            trash_thing.z = 0.25
                            trash_thing.follow(the_player_hitbox, 20)
                        })
                    }
                }
                story.spriteMoveToLocation(boss, boss.x, boss.y + tiles.tileWidth() * 3, 20)
            })
        })
        if (the_player_health.value <= 0) {
            timer.background(function () {
                story.printCharacterText("NOOOOOOOOOOOOOOOOOOOOOOOO", blockSettings.readString("save_" + save_num + "_name"))
            })
            enable_controls(false)
            fade_in(true)
            story.clearAllText()
            tiles.destroySpritesOfKind(SpriteKind.trash)
            tiles.destroySpritesOfKind(SpriteKind.Boss)
            return false
        } else if (boss_health.value <= 0) {
            timer.background(function () {
                story.printCharacterText("NOOOOOOOOOOOOOOOOOOOOOOOO", "Trash")
            })
            boss.destroy()
        }
        pause(1)
    }
    enable_controls(false)
    fade_in(true)
    tiles.destroySpritesOfKind(SpriteKind.trash)
    tiles.destroySpritesOfKind(SpriteKind.Boss)
    story.clearAllText()
    return true
}
function get_trash_image () {
    if (Math.percentChance(33)) {
        return img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . 1 1 1 . 1 1 1 . . . . . . . . 
            . 1 . 1 . 1 . 1 . . . . . 1 . . 
            . 1 1 1 . 1 . 1 1 1 . . 1 . . 1 
            . . . . 1 1 1 1 . 1 . 1 . . . 1 
            `
    } else if (Math.percentChance(50)) {
        return img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 7 9 7 7 7 7 7 7 7 7 . . . 
            . . . 7 7 7 7 7 7 7 7 7 7 . . . 
            . . . . 6 6 6 6 6 6 6 6 . . . . 
            . . . . 9 1 9 9 9 1 9 9 . . . . 
            . . . 9 1 9 9 9 9 9 1 9 9 . . . 
            . . . 9 9 1 1 1 9 1 9 1 9 . . . 
            . . . 6 6 9 6 9 6 9 6 6 9 . . . 
            . . . 9 9 6 9 6 9 6 1 9 6 . . . 
            . . . 6 6 6 9 9 6 9 9 6 9 . . . 
            . . . 1 9 9 9 1 9 9 9 9 9 . . . 
            . . . 9 9 9 9 9 9 9 9 9 9 . . . 
            . . . . 7 7 7 7 7 7 7 7 . . . . 
            `
    } else {
        return img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . 1 
            . . . . . . . . . . 1 1 1 1 1 d 
            . 1 . . . . 1 1 1 1 1 d d 1 d d 
            1 d 1 1 1 1 1 4 d 4 4 1 1 e e e 
            1 b b b 1 1 d f 4 f 1 7 d d f d 
            b d 1 d d b 1 4 4 1 e 7 f f f f 
            2 1 1 1 1 b b 1 1 e e 7 d f f f 
            2 f 1 1 d b b b b 1 e 7 f f f f 
            `
    }
}
function fade_out (block: boolean) {
    color.startFade(color.Black, color.originalPalette, 2000)
    if (block) {
        color.pauseUntilFadeDone()
    }
}
function fade_in (block: boolean) {
    color.startFade(color.originalPalette, color.Black, 2000)
    if (block) {
        color.pauseUntilFadeDone()
    }
}
function play_level_10 () {
    scene.setBackgroundImage(assets.image`level_5_background`)
    scene.setBackgroundColor(9)
    tiles.loadMap(tiles.createMap(tilemap`level39`))
    tiles.placeOnRandomTile(the_player_hitbox, assets.tile`start`)
    effects.blizzard.startScreenEffect()
    tiles.setTileAt(tiles.getTilesByType(assets.tile`start`)[0], assets.tile`transparency16`)
    for (let location of tiles.getTilesByType(assets.tile`myTile11`)) {
        trash_thing = sprites.create(get_trash_image(), SpriteKind.trash)
        tiles.placeOnTile(trash_thing, location)
        tiles.setTileAt(location, assets.tile`transparency16`)
    }
    for (let location of tiles.getTilesByType(assets.tile`myTile28`)) {
        trash_thing = sprites.create(assets.image`hostile_smoke`, SpriteKind.trash)
        tiles.placeOnTile(trash_thing, location)
        tiles.setTileAt(location, assets.tile`transparency16`)
    }
    the_player_health = statusbars.create(16, 2, StatusBarKind.Health)
    the_player_health.max = 10
    the_player_health.value = the_player_health.max
    the_player_health.attachToSprite(the_player_hitbox, 0, 0)
    the_player_health.setColor(7, 2)
    fade_out(false)
    enable_controls(true)
    while (sprites.allOfKind(SpriteKind.trash).length > 0) {
        for (let trash_thing of sprites.allOfKind(SpriteKind.trash)) {
            if (the_player_hitbox.overlapsWith(trash_thing)) {
                if (player_attacking) {
                    trash_thing.destroy()
                } else {
                    timer.throttle("take_damage", 500, function () {
                        the_player_health.value += -1
                    })
                    if (the_player_health.value <= 0) {
                        timer.background(function () {
                            story.printCharacterText("NOOOOOOOOOOOOOOOOOOOOOOOO", blockSettings.readString("save_" + save_num + "_name"))
                        })
                        enable_controls(false)
                        fade_in(true)
                        story.clearAllText()
                        tiles.destroySpritesOfKind(SpriteKind.trash)
                        return false
                    }
                }
            } else {
                if (spriteutils.distanceBetween(the_player_hitbox, trash_thing) < 64) {
                    trash_thing.follow(the_player_hitbox, 20)
                    trash_thing.ay = 0
                } else {
                    trash_thing.follow(the_player_hitbox, 0)
                }
            }
        }
        pause(1)
    }
    enable_controls(false)
    fade_in(true)
    return true
}
spriteutils.createRenderable(0, function (screen2) {
    if (level_selecting) {
        for (let index = 0; index <= all_level_sprites.length - 2; index++) {
            level_tile = all_level_sprites[index]
            level_next_tile = all_level_sprites[index + 1]
            screen2.drawLine(level_tile.x - scene.cameraProperty(CameraProperty.Left), level_tile.y - scene.cameraProperty(CameraProperty.Top), level_next_tile.x - scene.cameraProperty(CameraProperty.Left), level_next_tile.y - scene.cameraProperty(CameraProperty.Top), 15)
        }
    }
})
function summon_particle () {
    if (Math.percentChance(50)) {
        if (Math.percentChance(50)) {
            particle = sprites.create(assets.image`big_particle`, SpriteKind.Particle)
        } else {
            particle = sprites.create(assets.image`big_white_particle`, SpriteKind.Particle)
        }
    } else {
        if (Math.percentChance(50)) {
            particle = sprites.create(assets.image`small_particle`, SpriteKind.Particle)
        } else {
            particle = sprites.create(assets.image`small_bright_particle`, SpriteKind.Particle)
        }
    }
    particle.setFlag(SpriteFlag.RelativeToCamera, true)
    particle.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
    particle.lifespan = 2000
    if (Math.percentChance(50)) {
        animation.runMovementAnimation(
        particle,
        animation.animationPresets(animation.waveLeft),
        2000,
        false
        )
    } else {
        animation.runMovementAnimation(
        particle,
        animation.animationPresets(animation.waveRight),
        2000,
        false
        )
    }
}
function play_level (num: number) {
    if (num == 1) {
        return play_level_1()
    } else if (num == 2) {
        return play_level_2()
    } else if (num == 3) {
        return play_level_3()
    } else if (num == 4) {
        return play_level_4()
    } else if (num == 5) {
        return play_level_5()
    } else if (num == 6) {
        return play_level_6()
    } else if (num == 7) {
        return play_level_7()
    } else if (num == 8) {
        return play_level_8()
    } else if (num == 9) {
        return play_level_9()
    } else if (num == 10) {
        return play_level_10()
    } else if (num == -1) {
        return play_end_scene()
    } else {
        return false
    }
}
function play_level_4 () {
    scene.setBackgroundImage(assets.image`level_4_background`)
    scene.setBackgroundColor(9)
    tiles.loadMap(tiles.createMap(tilemap`level_4`))
    tiles.placeOnRandomTile(the_player_hitbox, assets.tile`start`)
    tiles.setTileAt(tiles.getTilesByType(assets.tile`start`)[0], assets.tile`transparency16`)
    for (let location of tiles.getTilesByType(assets.tile`myTile10`)) {
        trash_thing = sprites.create(get_trash_image(), SpriteKind.trash)
        tiles.placeOnTile(trash_thing, location)
        tiles.setTileAt(location, assets.tile`myTile8`)
    }
    for (let location of tiles.getTilesByType(assets.tile`myTile11`)) {
        trash_thing = sprites.create(get_trash_image(), SpriteKind.trash)
        tiles.placeOnTile(trash_thing, location)
        tiles.setTileAt(location, assets.tile`transparency16`)
    }
    trash_start_time = game.runtime()
    trash_timer = textsprite.create("Time left: ", 0, 15)
    trash_timer.bottom = scene.screenHeight() - 4
    trash_timer.left = 4
    trash_timer.setFlag(SpriteFlag.RelativeToCamera, true)
    fade_out(false)
    enable_controls(true)
    while (sprites.allOfKind(SpriteKind.trash).length > 0) {
        for (let trash_thing of sprites.allOfKind(SpriteKind.trash)) {
            if (the_player_hitbox.overlapsWith(trash_thing)) {
                trash_thing.destroy()
            }
        }
        if (game.runtime() - trash_start_time >= 47000) {
            trash_timer.setText("Time's up!")
            enable_controls(false)
            fade_in(true)
            tiles.destroySpritesOfKind(SpriteKind.trash)
            trash_timer.destroy()
            return false
        } else {
            trash_timer.setText("Time left: " + (47000 - (game.runtime() - trash_start_time)) / 1000 + "s")
        }
        pause(1)
    }
    enable_controls(false)
    fade_in(true)
    trash_timer.destroy()
    return true
}
function make_player () {
    player_attacking = false
    lock_controls = false
    the_player_hitbox = sprites.create(assets.image`player_hitbox`, SpriteKind.Player)
    enable_controls(false)
    the_player_hitbox.ay = GRAVITY
    the_player_hitbox.setFlag(SpriteFlag.Invisible, true)
    scene.cameraFollowSprite(the_player_hitbox)
    the_player = sprites.create(assets.image`player_idle_left`, SpriteKind.Player)
    the_player.z = 1
    the_player.setFlag(SpriteFlag.Ghost, true)
    characterAnimations.loopFrames(
    the_player,
    [assets.image`player_idle_left`],
    200,
    characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    the_player,
    [assets.image`player_idle_right`],
    200,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    the_player,
    assets.animation`player_walk_right`,
    200,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    the_player,
    assets.animation`player_walk_left`,
    200,
    characterAnimations.rule(Predicate.MovingLeft)
    )
}
function play_level_9 () {
    scene.setBackgroundImage(assets.image`level_6_background`)
    scene.setBackgroundColor(9)
    tiles.loadMap(tiles.createMap(tilemap`level_9`))
    tiles.placeOnRandomTile(the_player_hitbox, assets.tile`start`)
    tiles.setTileAt(tiles.getTilesByType(assets.tile`start`)[0], assets.tile`transparency16`)
    the_player_health = statusbars.create(16, 2, StatusBarKind.Health)
    the_player_health.max = 20
    the_player_health.value = the_player_health.max
    the_player_health.attachToSprite(the_player_hitbox, 0, 0)
    the_player_health.setColor(7, 2)
    boss = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . b b b b b . . . b b b b b . . 
        . b b b b b . . . b b b b b . . 
        . b b b b b . . . b b b b b . . 
        . b b b b b b b b b b b b b . . 
        . b b b b b b b b b b b b b . . 
        b b b 2 b b b 2 b b b b b . . . 
        b b b 2 2 b 2 2 b b b b b . . . 
        b b b b b b b b b b b b b . . . 
        b b b b b b b b b b b b b b . . 
        b b b b b b b b b b b b b b . . 
        . b b b b b b b b b b b b b . . 
        . b b b b b b b b b b b b b . . 
        . b b b b b b b b b b b b b . . 
        . b b b b b b b b b b b . . . . 
        . . . b b b b b . . . . . . . . 
        `, SpriteKind.Boss)
    animation.runImageAnimation(
    boss,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . b b b b b . . . . . . 
        . . . . . b b b b b . . . . . . 
        b b b b b b b b b b b b b . . . 
        b b b b b b b b b b b b b . . . 
        b b b b b b b b b b b b b . . . 
        b b b 2 b b b 2 b b b b b . . . 
        b b b 2 2 b 2 2 b b b b b . . . 
        b b b b b b b b b b b b b . . . 
        b b b b b b b b b b b b b b b . 
        b b b b b b b b b b b b b b b . 
        b b b b b b b b b b b b b b b . 
        b b b b b b b b b b b b b b b . 
        . b b b b b . b b b b b b b b . 
        . b b b b b . b b b b b . . . . 
        . . . . . . . b b b b b . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        b b b b . . . . . . . . . . . . 
        b b b b b b b . . . . . . . . . 
        b b b b b b b b b b b . . . . . 
        b b b b b b b b b b b b b b . . 
        b b b 2 b b b 2 b b b b b b . . 
        b b b 2 2 b 2 2 b b b b b b . . 
        b b b b b b b b b b b b b b b . 
        b b b b b b b b b b b b b b b . 
        b b b b b b b b b b b b b b b . 
        b b b b b b b b b b b b b b b . 
        . b b b b b b b b b b b b b b . 
        . b b b b b b b b b b b b b b . 
        . b b b b b b b b b b b b b b . 
        . . . . . b b b b b b b b . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        b b b b b b b b b b b b . . . . 
        b b b b b b b b b b b b b . . . 
        b b b b b b b b b b b b b . . . 
        b b b b b b b b b b b b b . . . 
        b b b 2 b b b 2 b b b b b . . . 
        . b b 2 2 b 2 2 b b b b b . . . 
        . b b b b b b b b b b b b . . . 
        . b b b b b b b b b b b b . . . 
        . b b b b b b b b b b b b . . . 
        . b b b b b b b b b b b b . . . 
        . b b b b b b b b b b b b . . . 
        . . . b b b b b . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        b b b b b . . . . . b b b b b . 
        b b b b b b b b b . b b b b b . 
        b b b b b b b b b b b b b b b . 
        b b b b b b b b b b b b b b b . 
        b b b 2 b b b 2 b b b b b b b . 
        . b b 2 2 b 2 2 b b b b b b . . 
        . b b b b b b b b b b b b b . . 
        . b b b b b b b b b b b b b . . 
        b b b b b b b b b b b b b b . . 
        b b b b b b b b b b b b b b . . 
        b b b b b b b b b b b b b b . . 
        b b b b b b b b b b b b b b . . 
        b b b b b b b b . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    90,
    true
    )
    boss.z = 0.5
    tiles.placeOnRandomTile(boss, assets.tile`boss_tile`)
    tiles.setTileAt(tiles.getTilesByType(assets.tile`boss_tile`)[0], assets.tile`transparency16`)
    boss_health = statusbars.create(16, 2, StatusBarKind.Health)
    boss_health.max = 75
    boss_health.value = boss_health.max
    boss_health.attachToSprite(boss, 0, 0)
    boss_health.setColor(7, 2)
    fade_out(false)
    enable_controls(true)
    while (sprites.allOfKind(SpriteKind.Boss).length > 0) {
        for (let trash_thing of sprites.allOfKind(SpriteKind.trash)) {
            if (the_player_hitbox.overlapsWith(trash_thing)) {
                if (player_attacking) {
                    trash_thing.destroy()
                } else {
                    timer.throttle("take_damage", 500, function () {
                        the_player_health.value += -1
                    })
                }
            }
        }
        if (the_player_hitbox.overlapsWith(boss)) {
            if (player_attacking) {
                timer.throttle("boss_take_damage", 500, function () {
                    boss_health.value += -1
                })
            }
        }
        timer.throttle("boss_summon_enemy", 10000, function () {
            timer.background(function () {
                story.spriteMoveToLocation(boss, boss.x, boss.y - tiles.tileWidth() * 3, 25)
                for (let index = 0; index < 6; index++) {
                    pause(750)
                    if (spriteutils.isDestroyed(boss)) {
                        break;
                    }
                    trash_thing = sprites.create(img`
                        . . . . . . . . . . . . . . . . 
                        . b b b b b . . . b b b b b . . 
                        . b b b b b . . . b b b b b . . 
                        . b b b b b . . . b b b b b . . 
                        . b b b b b b b b b b b b b . . 
                        . b b b b b b b b b b b b b . . 
                        b b b 2 b b b 2 b b b b b . . . 
                        b b b 2 b b b 2 b b b b b . . . 
                        b b b b b b b b b b b b b . . . 
                        b b b b b b b b b b b b b b . . 
                        b b b b b b b b b b b b b b . . 
                        . b b b b b b b b b b b b b . . 
                        . b b b b b b b b b b b b b . . 
                        . b b b b b b b b b b b b b . . 
                        . b b b b b b b b b b b . . . . 
                        . . . b b b b b . . . . . . . . 
                        `, SpriteKind.trash)
                    trash_thing.setPosition(boss.x, boss.y)
                    trash_thing.z = 0.25
                    trash_thing.follow(the_player_hitbox, 20)
                    if (boss_health.value < boss_health.max / 2) {
                        timer.after(375, function () {
                            trash_thing = sprites.create(img`
                                . . . . . . . . . . . . . . . . 
                                . b b b b b . . . b b b b b . . 
                                . b b b b b . . . b b b b b . . 
                                . b b b b b . . . b b b b b . . 
                                . b b b b b b b b b b b b b . . 
                                . b b b b b b b b b b b b b . . 
                                b b b 2 b b b 2 b b b b b . . . 
                                b b b 2 b b b 2 b b b b b . . . 
                                b b b b b b b b b b b b b . . . 
                                b b b b b b b b b b b b b b . . 
                                b b b b b b b b b b b b b b . . 
                                . b b b b b b b b b b b b b . . 
                                . b b b b b b b b b b b b b . . 
                                . b b b b b b b b b b b b b . . 
                                . b b b b b b b b b b b . . . . 
                                . . . b b b b b . . . . . . . . 
                                `, SpriteKind.trash)
                            trash_thing.setPosition(boss.x, boss.y)
                            trash_thing.z = 0.25
                            trash_thing.follow(the_player_hitbox, 20)
                        })
                    }
                }
                story.spriteMoveToLocation(boss, boss.x, boss.y + tiles.tileWidth() * 3, 25)
            })
        })
        if (the_player_health.value <= 0) {
            timer.background(function () {
                story.printCharacterText("NOOOOOOOOOOOOOOOOOOOOOOOO", blockSettings.readString("save_" + save_num + "_name"))
            })
            enable_controls(false)
            fade_in(true)
            story.clearAllText()
            tiles.destroySpritesOfKind(SpriteKind.trash)
            tiles.destroySpritesOfKind(SpriteKind.Boss)
            return false
        } else if (boss_health.value <= 0) {
            timer.background(function () {
                story.printCharacterText("NOOOOOOOOOOOOOOOOOOOOOOOO", "Smoke")
            })
            boss.destroy()
        }
        pause(1)
    }
    enable_controls(false)
    fade_in(true)
    tiles.destroySpritesOfKind(SpriteKind.trash)
    tiles.destroySpritesOfKind(SpriteKind.Boss)
    story.clearAllText()
    return true
}
function level_selector () {
    tiles.loadMap(tiles.createMap(tilemap`level_selector`))
    level_picker = sprites.create(assets.image`level_picker`, SpriteKind.LevelPicker)
    level_picker.z = 2
    controller.moveSprite(level_picker)
    scene.cameraFollowSprite(level_picker)
    all_level_tiles = [
    assets.tile`level_1_tile0`,
    assets.tile`level_2_tile0`,
    assets.tile`level_3_tile`,
    assets.tile`level_4_tile`,
    assets.tile`level_5_tile0`,
    assets.tile`level_6_tile`,
    assets.tile`level_3_tile0`,
    assets.tile`level_3_tile1`,
    assets.tile`level_9_tile`,
    assets.tile`level_3_tile3`
    ]
    all_level_text = [
    "You see something in the distance...",
    "You see some ruins up ahead...",
    "Talk with the pheonix!",
    "Help #TeamSeas clean up the ocean!",
    "The trash has come alive!",
    "A giant trash monster is wrecking havoc!",
    "Help clean up the city!",
    "Oh great now the smoke is alive!",
    "Seriously? A SMOKE monster???",
    "Ice is nice and pollution is not!"
    ]
    all_level_sprites = []
    for (let index = 0; index <= all_level_tiles.length - 1; index++) {
        if (index + 1 < max_level) {
            level_tile = sprites.create(assets.image`re_do_able_level`, SpriteKind.LevelTile)
            sprites.setDataString(level_tile, "hover_text", all_level_text[index])
            sprites.setDataBoolean(level_tile, "can_play", true)
            sprites.setDataNumber(level_tile, "type", 2)
        } else if (index + 1 == max_level) {
            level_tile = sprites.create(assets.image`to_be_done_level`, SpriteKind.LevelTile)
            sprites.setDataString(level_tile, "hover_text", "???")
            sprites.setDataBoolean(level_tile, "can_play", true)
            sprites.setDataNumber(level_tile, "type", 1)
        } else {
            level_tile = sprites.create(assets.image`locked_level`, SpriteKind.LevelTile)
            sprites.setDataString(level_tile, "hover_text", "Locked!")
            sprites.setDataBoolean(level_tile, "can_play", false)
            sprites.setDataNumber(level_tile, "type", 0)
        }
        sprites.setDataNumber(level_tile, "level", index + 1)
        level_tile.z = 1
        all_level_sprites.push(level_tile)
        tiles.placeOnTile(level_tile, tiles.getTilesByType(all_level_tiles[index])[0])
        if (all_level_tiles[index].getPixel(0, 0) == images.colorBlock(6)) {
            tiles.setTileAt(tiles.getTilesByType(all_level_tiles[index])[0], assets.tile`jungle_tile`)
        } else if (all_level_tiles[index].getPixel(0, 0) == images.colorBlock(13)) {
            tiles.setTileAt(tiles.getTilesByType(all_level_tiles[index])[0], assets.tile`beach`)
        } else if (all_level_tiles[index].getPixel(0, 0) == images.colorBlock(7)) {
            tiles.setTileAt(tiles.getTilesByType(all_level_tiles[index])[0], assets.tile`city`)
        } else if (all_level_tiles[index].getPixel(0, 0) == images.colorBlock(8)) {
            tiles.setTileAt(tiles.getTilesByType(all_level_tiles[index])[0], assets.tile`myTile21`)
        }
    }
    if (all_level_tiles.length <= max_level) {
        level_tile = sprites.create(assets.image`the_end_tile`, SpriteKind.LevelTile)
        sprites.setDataBoolean(level_tile, "can_play", true)
        sprites.setDataString(level_tile, "hover_text", "The end! (for now)")
    } else {
        level_tile = sprites.create(assets.image`locked_level`, SpriteKind.LevelTile)
        sprites.setDataBoolean(level_tile, "can_play", false)
        sprites.setDataString(level_tile, "hover_text", "Locked!")
    }
    sprites.setDataNumber(level_tile, "level", -1)
    all_level_sprites.push(level_tile)
    tiles.placeOnTile(level_tile, tiles.getTilesByType(assets.tile`end_tile`)[0])
    tiles.setTileAt(tiles.getTilesByType(assets.tile`end_tile`)[0], assets.tile`jungle_tile`)
    fade_out(true)
    while (true) {
        for (let level_tile of sprites.allOfKind(SpriteKind.LevelTile)) {
            if (level_picker.overlapsWith(level_tile)) {
                level_tile.sayText(sprites.readDataString(level_tile, "hover_text"))
                if (controller.A.isPressed() && sprites.readDataBoolean(level_tile, "can_play")) {
                    next_level = sprites.readDataNumber(level_tile, "level")
                    level_picker.destroy()
                    fade_in(true)
                    tiles.destroySpritesOfKind(SpriteKind.LevelPicker)
                    tiles.destroySpritesOfKind(SpriteKind.LevelTile)
                    return
                }
            } else {
                level_tile.sayText("")
            }
        }
        pause(1)
    }
}
function enable_controls (en: boolean) {
    lock_controls = !(en)
    speed = 80
    if (en) {
        controller.moveSprite(the_player_hitbox, speed, 0)
    } else {
        controller.moveSprite(the_player_hitbox, 0, 0)
    }
}
function save_selector2 () {
    scene.setBackgroundImage(assets.image`title_screen_background`)
    tiles.loadMap(tiles.createMap(tilemap`title_screen_map`))
    title_shader = shader.createImageShaderSprite(assets.image`title_screen_shader`, shader.ShadeLevel.One)
    title_shader.setPosition(scene.screenWidth() / 2, scene.screenHeight() / 2)
    title_shader.setFlag(SpriteFlag.Ghost, true)
    title_shader.z = 1
    save_1_button = sprites.create(assets.image`save_1`, SpriteKind.Save)
    save_1_button.top = 10
    save_1_button.left = 10
    save_1_button.z = 2
    save_1_button.setFlag(SpriteFlag.Ghost, true)
    save_2_button = sprites.create(assets.image`save_2`, SpriteKind.Save)
    save_2_button.top = save_1_button.top
    save_2_button.left = save_1_button.right + 10
    save_2_button.z = 2
    save_2_button.setFlag(SpriteFlag.Ghost, true)
    save_3_button = sprites.create(assets.image`save_3`, SpriteKind.Save)
    save_3_button.top = save_2_button.top
    save_3_button.left = save_2_button.right + 10
    save_3_button.z = 2
    save_3_button.setFlag(SpriteFlag.Ghost, true)
    save_selector = sprites.create(assets.image`save_selector`, SpriteKind.Save)
    save_selector.x = save_1_button.x
    save_selector.top = save_1_button.bottom + 10
    save_selector.setFlag(SpriteFlag.Ghost, true)
    save_name = textsprite.create("", 0, 15)
    save_name.setOutline(1, 1)
    save_name.top = save_selector.bottom + 5
    save_name.left = save_1_button.left
    save_name.z = 2
    save_name.setFlag(SpriteFlag.Ghost, true)
    save_max_level = textsprite.create("", 0, 15)
    save_max_level.setOutline(1, 1)
    save_max_level.top = save_name.bottom + 5
    save_max_level.left = save_name.left
    save_max_level.z = 2
    save_max_level.setFlag(SpriteFlag.Ghost, true)
    save_instructions = textsprite.create("Loading saves...", 0, 15)
    save_instructions.setOutline(1, 1)
    save_instructions.top = save_max_level.bottom + 5
    save_instructions.left = save_name.left
    save_instructions.z = 2
    save_instructions.setFlag(SpriteFlag.Ghost, true)
    save_highlighted = 1
    show_particles = true
    fade_out(true)
    while (!(controller.A.isPressed())) {
        timer.throttle("controller_check", 100, function () {
            if (controller.left.isPressed()) {
                save_highlighted = Math.max(save_highlighted - 1, 1)
            } else if (controller.right.isPressed()) {
                save_highlighted = Math.min(save_highlighted + 1, 3)
            } else if (controller.B.isPressed()) {
                if (blockSettings.exists("save_" + save_highlighted + "_name")) {
                    while (controller.B.isPressed()) {
                        pause(1)
                    }
                    if (game.ask("Delete save " + save_highlighted + "?")) {
                        for (let location of blockSettings.list()) {
                            if (location.includes("save_" + save_highlighted)) {
                                blockSettings.remove(location)
                            }
                        }
                        game.showLongText("Deleted save " + save_highlighted + "!", DialogLayout.Bottom)
                        while (controller.A.isPressed()) {
                            pause(1)
                        }
                    }
                }
            }
            if (save_highlighted == 1) {
                save_selector.x = save_1_button.x
            } else if (save_highlighted == 2) {
                save_selector.x = save_2_button.x
            } else {
                save_selector.x = save_3_button.x
            }
            if (blockSettings.exists("save_" + save_highlighted + "_name")) {
                save_name.setText("Name: " + blockSettings.readString("save_" + save_highlighted + "_name"))
                save_max_level.setText("Level: " + blockSettings.readNumber("save_" + save_highlighted + "_max_level"))
                save_instructions.setText("A to use / B to delete")
            } else {
                save_name.setText("Empty save!")
                save_max_level.setText("")
                save_instructions.setText("A to use")
            }
        })
        pause(1)
    }
    save_num = save_highlighted
    fade_in(true)
    show_particles = false
    title_shader.destroy()
    tiles.destroySpritesOfKind(SpriteKind.Save)
    save_name.destroy()
    save_max_level.destroy()
    save_instructions.destroy()
    clear_particles()
}
function play_end_scene () {
    scene.setBackgroundImage(assets.image`level_3_background`)
    scene.setBackgroundColor(9)
    tiles.loadMap(tiles.createMap(tilemap`level_end`))
    tiles.placeOnRandomTile(the_player_hitbox, assets.tile`start`)
    tiles.setTileAt(tiles.getTilesByType(assets.tile`start`)[0], assets.tile`transparency16`)
    next_level_loc = tiles.getTilesByType(assets.tile`next_level_tile`)[0]
    tiles.setTileAt(next_level_loc, assets.tile`transparency16`)
    show_particles = true
    fade_out(false)
    enable_controls(true)
    while (true) {
        player_loc = tiles.locationOfSprite(the_player_hitbox)
        if (tiles.locationXY(player_loc, tiles.XY.column) == tiles.locationXY(next_level_loc, tiles.XY.column) && tiles.locationXY(player_loc, tiles.XY.row) == tiles.locationXY(next_level_loc, tiles.XY.row)) {
            break;
        }
        pause(1)
    }
    enable_controls(false)
    story.printCharacterText("You have done well " + blockSettings.readString("save_" + save_num + "_name") + ".", "Phoenix")
    story.printCharacterText("You have done a small, but good part in healing the world. ", "Phoenix")
    story.printCharacterText("Hopefully, more people will continue your efforts and spread them across the globe", "Phoenix")
    story.printCharacterText("Now, off to the next person. I mean, what?", "Phoenix")
    story.printCharacterText("I hope to see you again soon " + blockSettings.readString("save_" + save_num + "_name") + ".", "Phoenix")
    fade_in(true)
    show_particles = false
    clear_particles()
    return true
}
function player_attack () {
    timer.throttle("player_attack", 350, function () {
        player_attacking = true
        characterAnimations.setCharacterAnimationsEnabled(the_player, false)
        if (characterAnimations.matchesRule(the_player, characterAnimations.rule(Predicate.Moving))) {
            if (characterAnimations.matchesRule(the_player, characterAnimations.rule(Predicate.FacingRight))) {
                animation.runImageAnimation(
                the_player,
                assets.animation`player_attack_right`,
                50,
                false
                )
            } else {
                animation.runImageAnimation(
                the_player,
                assets.animation`player_attack_left`,
                50,
                false
                )
            }
        } else {
            if (characterAnimations.matchesRule(the_player, characterAnimations.rule(Predicate.FacingRight))) {
                animation.runImageAnimation(
                the_player,
                assets.animation`player_idle_attack_right`,
                50,
                false
                )
            } else {
                animation.runImageAnimation(
                the_player,
                assets.animation`player_idle_attack_left`,
                50,
                false
                )
            }
        }
        timer.after(300, function () {
            characterAnimations.setCharacterAnimationsEnabled(the_player, true)
            player_attacking = false
        })
    })
}
function play_level_8 () {
    scene.setBackgroundImage(assets.image`level_5_background`)
    scene.setBackgroundColor(9)
    tiles.loadMap(tiles.createMap(tilemap`level_8`))
    tiles.placeOnRandomTile(the_player_hitbox, assets.tile`start`)
    tiles.setTileAt(tiles.getTilesByType(assets.tile`start`)[0], assets.tile`transparency16`)
    for (let location of tiles.getTilesByType(assets.tile`myTile11`)) {
        trash_thing = sprites.create(get_trash_image(), SpriteKind.trash)
        tiles.placeOnTile(trash_thing, location)
        tiles.setTileAt(location, assets.tile`transparency16`)
    }
    for (let location of tiles.getTilesByType(assets.tile`myTile28`)) {
        trash_thing = sprites.create(assets.image`hostile_smoke`, SpriteKind.trash)
        tiles.placeOnTile(trash_thing, location)
        tiles.setTileAt(location, assets.tile`transparency16`)
    }
    the_player_health = statusbars.create(16, 2, StatusBarKind.Health)
    the_player_health.max = 10
    the_player_health.value = the_player_health.max
    the_player_health.attachToSprite(the_player_hitbox, 0, 0)
    the_player_health.setColor(7, 2)
    fade_out(false)
    enable_controls(true)
    while (sprites.allOfKind(SpriteKind.trash).length > 0) {
        for (let trash_thing of sprites.allOfKind(SpriteKind.trash)) {
            if (the_player_hitbox.overlapsWith(trash_thing)) {
                if (player_attacking) {
                    trash_thing.destroy()
                } else {
                    timer.throttle("take_damage", 500, function () {
                        the_player_health.value += -1
                    })
                    if (the_player_health.value <= 0) {
                        timer.background(function () {
                            story.printCharacterText("NOOOOOOOOOOOOOOOOOOOOOOOO", blockSettings.readString("save_" + save_num + "_name"))
                        })
                        enable_controls(false)
                        fade_in(true)
                        story.clearAllText()
                        tiles.destroySpritesOfKind(SpriteKind.trash)
                        return false
                    }
                }
            } else {
                if (spriteutils.distanceBetween(the_player_hitbox, trash_thing) < 64) {
                    trash_thing.follow(the_player_hitbox, 20)
                    trash_thing.ay = 0
                } else {
                    trash_thing.follow(the_player_hitbox, 0)
                    trash_thing.ay = GRAVITY
                }
            }
        }
        pause(1)
    }
    enable_controls(false)
    fade_in(true)
    return true
}
function play_level_1 () {
    scene.setBackgroundImage(assets.image`level_1_background`)
    scene.setBackgroundColor(9)
    tiles.loadMap(tiles.createMap(tilemap`level_1`))
    tiles.placeOnRandomTile(the_player_hitbox, assets.tile`start`)
    tiles.setTileAt(tiles.getTilesByType(assets.tile`start`)[0], assets.tile`transparency16`)
    next_level_loc = tiles.getTilesByType(assets.tile`next_level_tile`)[0]
    tiles.setTileAt(next_level_loc, assets.tile`transparency16`)
    fade_out(true)
    story.printCharacterText("Ah what a beautiful day in the jungle!", blockSettings.readString("save_" + save_num + "_name"))
    story.printCharacterText("Hey, what's glowing over there past the mountains?", blockSettings.readString("save_" + save_num + "_name"))
    enable_controls(true)
    while (true) {
        player_loc = tiles.locationOfSprite(the_player_hitbox)
        if (tiles.locationXY(player_loc, tiles.XY.column) == tiles.locationXY(next_level_loc, tiles.XY.column) && tiles.locationXY(player_loc, tiles.XY.row) == tiles.locationXY(next_level_loc, tiles.XY.row)) {
            break;
        }
        pause(1)
    }
    enable_controls(false)
    fade_in(true)
    return true
}
let save_highlighted = 0
let save_instructions: TextSprite = null
let save_max_level: TextSprite = null
let save_name: TextSprite = null
let save_selector: Sprite = null
let save_3_button: Sprite = null
let save_2_button: Sprite = null
let save_1_button: Sprite = null
let speed = 0
let all_level_text: string[] = []
let all_level_tiles: Image[] = []
let level_picker: Sprite = null
let particle: Sprite = null
let level_next_tile: Sprite = null
let level_tile: Sprite = null
let all_level_sprites: Sprite[] = []
let boss_health: StatusBarSprite = null
let boss: Sprite = null
let the_player: Sprite = null
let trash_timer: TextSprite = null
let trash_start_time = 0
let player_attacking = false
let the_player_health: StatusBarSprite = null
let trash_thing: Sprite = null
let title_shader: Sprite = null
let title_bottom: TextSprite = null
let title_by_2row: TextSprite = null
let title_by: TextSprite = null
let title_top: TextSprite = null
let player_loc: tiles.Location = null
let next_level_loc: tiles.Location = null
let the_player_hitbox: Sprite = null
let lock_controls = false
let max_level = 0
let show_particles = false
let level_selecting = false
let save_num = 0
let next_level = 0
let GRAVITY = 0
stats.turnStats(true)
GRAVITY = 500
next_level = 1
save_num = 1
level_selecting = true
show_particles = false
let dev_mode = true
pause(100)
if (controller.B.isPressed()) {
    if (game.ask("Reset everything?")) {
        blockSettings.clear()
        game.showLongText("Successfully reset everything!", DialogLayout.Bottom)
        game.reset()
    }
}
color.setPalette(
color.Black
)
timer.background(function () {
    if (!(dev_mode)) {
        title_screen()
        save_selector2()
    }
    if (!(blockSettings.exists("save_" + save_num + "_name"))) {
        color.setPalette(
        color.originalPalette
        )
        blockSettings.writeString("save_" + save_num + "_name", game.askForString("What is your name?", 24))
        color.setPalette(
        color.Black
        )
    }
    if (!(blockSettings.exists("save_" + save_num + "_max_level"))) {
        blockSettings.writeNumber("save_" + save_num + "_max_level", 1)
    }
    while (true) {
        if (dev_mode) {
            max_level = 99999999999
        } else {
            max_level = blockSettings.readNumber("save_" + save_num + "_max_level")
        }
        level_selecting = true
        level_selector()
        level_selecting = false
        make_player()
        if (play_level(next_level) && next_level == max_level) {
            blockSettings.writeNumber("save_" + save_num + "_max_level", max_level + 1)
        }
        tiles.destroySpritesOfKind(SpriteKind.Player)
    }
})
game.onUpdate(function () {
    if (!(level_selecting) && the_player) {
        the_player.x = the_player_hitbox.x
        the_player.y = the_player_hitbox.y
    }
})
game.onUpdateInterval(250, function () {
    if (show_particles) {
        summon_particle()
    }
})
forever(function () {
    if (!(lock_controls)) {
        if (controller.B.isPressed()) {
            speed = 120
            controller.moveSprite(the_player_hitbox, speed, 0)
            characterAnimations.loopFrames(
            the_player,
            [img`
                ........................
                ........................
                ..........ee.e.e........
                ..........eeeee.........
                ..........dfef..........
                ..........dfdf..........
                ..........dddd..........
                .eeeef..e88bb88.........
                bbbbbfdd666bb66.........
                .eeeefeeeebbbb6.........
                eeeeeeeeeebbbbd.........
                eeeeeeeeeebbbbd.........
                eeeeeeeeeebbbb..........
                .eeeeeeee.cccc..........
                ..........c..c..........
                ..........c..c..........
                `,img`
                ........................
                ........................
                ..........ee.e.e........
                ..........eeeee.........
                ..........dfef..........
                ..........dfdf..........
                ..........dddd..........
                .....f...88bb88.........
                bbbbbfdd666bb66.........
                ..eeefeeeebbbb6.........
                eeeeeeeeeebbbbd.........
                eeeeeeeeeebbbbd.........
                .eeeeeeeeebbbb..........
                ....eeeee.cccc..........
                ..........c..c..........
                .............c..........
                `,img`
                ........................
                ........................
                ..........ee.e.e........
                ..........eeeee.........
                ..........dfef..........
                ..........dfdf..........
                ..........dddd..........
                .....f...88bb88.........
                bbbbbfdd666bb66.........
                .eeeefeeeebbbb6.........
                eeeeeeeeeebbbbd.........
                eeeeeeeeeebbbbd.........
                .eeeeeeeeebbbb..........
                ..eeeeeee.cccc..........
                ...........cc...........
                ............c...........
                `,img`
                ........................
                ........................
                ..........ee.e.e........
                ..........eeeee.........
                ..........dfef..........
                ..........dfdf..........
                ..........dddd..........
                .....f...88bb88.........
                bbbbbfdd666bb66.........
                .eeeefeeeebbbb6.........
                eeeeeeeeeebbbbd.........
                eeeeeeeeeebbbbd.........
                eeeeeeeeeebbbb..........
                .....eeee.cccc..........
                ...........cc...........
                ...........c............
                `],
            100,
            characterAnimations.rule(Predicate.MovingRight)
            )
            characterAnimations.loopFrames(
            the_player,
            [img`
                ........................
                ........................
                ........e.e.ee..........
                .........eeeee..........
                ..........fefd..........
                ..........fdfd..........
                ..........dddd..........
                .........88bb88e..feeee.
                .........66bb666ddfbbbbb
                .........6bbbbeeeefeeee.
                .........dbbbbeeeeeeeeee
                .........dbbbbeeeeeeeeee
                ..........bbbbeeeeeeeeee
                ..........cccc.eeeeeeee.
                ..........c..c..........
                ..........c..c..........
                `,img`
                ........................
                ........................
                ........e.e.ee..........
                .........eeeee..........
                ..........fefd..........
                ..........fdfd..........
                ..........dddd..........
                .........88bb88...f.....
                .........66bb666ddfbbbbb
                .........6bbbbeeeefeee..
                .........dbbbbeeeeeeeeee
                .........dbbbbeeeeeeeeee
                ..........bbbbeeeeeeeee.
                ..........cccc.eeeee....
                ..........c..c..........
                ..........c.............
                `,img`
                ........................
                ........................
                ........e.e.ee..........
                .........eeeee..........
                ..........fefd..........
                ..........fdfd..........
                ..........dddd..........
                .........88bb88...f.....
                .........66bb666ddfbbbbb
                .........6bbbbeeeefeeee.
                .........dbbbbeeeeeeeeee
                .........dbbbbeeeeeeeeee
                ..........bbbbeeeeeeeee.
                ..........cccc.eeeeeee..
                ...........cc...........
                ...........c............
                `,img`
                ........................
                ........................
                ........e.e.ee..........
                .........eeeee..........
                ..........fefd..........
                ..........fdfd..........
                ..........dddd..........
                .........88bb88...f.....
                .........66bb666ddfbbbbb
                .........6bbbbeeeefeeee.
                .........dbbbbeeeeeeeeee
                .........dbbbbeeeeeeeeee
                ..........bbbbeeeeeeeeee
                ..........cccc.eeee.....
                ...........cc...........
                ............c...........
                `],
            100,
            characterAnimations.rule(Predicate.MovingLeft)
            )
        } else {
            characterAnimations.loopFrames(
            the_player,
            assets.animation`player_walk_right`,
            200,
            characterAnimations.rule(Predicate.MovingRight)
            )
            characterAnimations.loopFrames(
            the_player,
            assets.animation`player_walk_left`,
            200,
            characterAnimations.rule(Predicate.MovingLeft)
            )
            speed = 80
            controller.moveSprite(the_player_hitbox, speed, 0)
        }
    }
})
