import * as PIXI from './lib/pixi.mjs'
import { player } from './player.js'
import { youLooseText, youWinText } from './endGameText.js'
import { asteroids } from './asteroid.js'
import { deleteAsteroid } from './asteroid.js'

export let bullets = []
export let ammo = {
  shots: 10
}

export function deleteBulletAndAsteriodIfHit (app, bullet) {
  let asteroidCollision 
  let bulletCollision
  asteroids.forEach(checkAsteriodCOllision)
  function  checkAsteriodCOllision (asteroid) {
    if (collision(bullet, asteroid)) {  
      asteroidCollision = asteroid
      bulletCollision = bullet
    }
  }
  if (bulletCollision) {
    deleteBullet(app, bulletCollision) 
  }
  if (asteroidCollision) {  
    deleteAsteroid(app, asteroidCollision)
  }
  if (asteroids.length == 0) {
    console.log('lenght',asteroids.length)
    app.stage.addChild(youWinText)
  }
}

export function deleteBulletIfLeftScreen (app,bullet) {
  if (bullet.y < 0) {
    deleteBullet(app, bullet)
  }
}


function createBullet(x,y) {
  const bullet = new PIXI.Graphics()
  bullet.beginFill(0xffffff)
  bullet.drawCircle(10, 0, 10)
  bullet.endFill()
  bullet.beginFill('yellow')
  bullet.drawRect(0, 0, 20, 40)
  bullet.endFill()

  bullet.x = x + player.width / 2 - bullet.width / 2
  bullet.y = y
  return bullet
}

export function moveBullet (app, bullet) {
  bullet.y -= 10
}

export function fireBullet (app) {
  if (ammo.shots > 0) {
    ammo.shots = ammo.shots - 1
    const newBullet = createBullet(player.x,player.y)
    bullets.push(newBullet)
    app.stage.addChild(newBullet)
  } else {
    app.stage.addChild(youLooseText)
  }
}

function collision (bullet, asteroid) {
  if (
      bullet.x + bullet.width > asteroid.x &&
      bullet.x < asteroid.x + asteroid.width &&
      bullet.y + bullet.height > asteroid.y &&
      bullet.y < asteroid.y + asteroid.height
    ) {
    return true
  } else {
    return false
  }
}

function deleteBulletFromArray (bullet) {
  bullets = bullets.filter(function(item) {
    if (item == bullet) {
      return false
    } else {
      return true
    }
  })
}

function deleteBullet (app, bullet) {
  deleteBulletFromArray(bullet)
  app.stage.removeChild(bullet)
  bullet.destroy()
}

