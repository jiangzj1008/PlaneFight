class PlayerDie extends GeImage {
    constructor(game) {
        super(game, 'player')
        this.name = 'player_die'
        this.setup()
    }
    setup() {
        this.life = 1
        this.changeCount = 1
        this.changeTimes = 4
        this.cooldown = 3
        var name = this.name + this.changeCount
        this.texture = this.game.textureByName(name)
    }
    update() {
        if (this.cooldown > 0) {
            this.cooldown--
        } else {
            if (this.changeCount < this.changeTimes) {
                var name = this.name + (this.changeCount + 1)
                this.texture = this.game.textureByName(name)
                this.changeCount++
                this.cooldown = 3
            } else {
                this.life = 0
            }
        }
    }
}

class Player extends GeImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.life = 1
        this.bullets = []
        this.x = (500 - this.w) / 2
        this.y = 800 - this.h - 50
        this.speed = 15
        this.cooldown = 1
    }
    move(x, y) {
        if (this.life <= 0) {
            return
        }
        if (x < 0) {
            x = 0
        } else if (x > 500 - this.w) {
            x = 500 - this.w
        }
        if (y < 0) {
            y = 0
        } else if (y > 800 - this.h) {
            y = 800 - this.h
        }
        this.x = x
        this.y = y
    }
    moveLeft(keyStatus) {
        if (keyStatus == 'up') {
            return
        }
        this.move((this.x - this.speed), this.y)
    }
    moveRight(keyStatus) {
        if (keyStatus == 'up') {
            return
        }
        this.move((this.x + this.speed), this.y)
    }
    moveUp(keyStatus) {
        if (keyStatus == 'up') {
            return
        }
        this.move(this.x, (this.y - this.speed))
    }
    moveDown(keyStatus) {
        if (keyStatus == 'up') {
            return
        }
        this.move(this.x, (this.y + this.speed))
    }
    addBullet() {
        var x = this.x + this.w/2
        var y = this.y
        var b = Bullet1.new(this.game)
        b.x = x
        b.y = y
        this.scene.addElement(b, 'bullets')
        this.cooldown = 4
    }
    addBullet_2() {
        var x1 = this.x + 10
        var x2 = this.x + this.w - 20
        var y = this.y
        var b1 = Bullet1.new(this.game)
        var b2 = Bullet1.new(this.game)
        b1.x = x1
        b2.x = x2
        b1.y = y
        b2.y = y
        this.scene.addElement(b1, 'bullets')
        this.scene.addElement(b2, 'bullets')
        this.cooldown = 4
    }
    fire(gunStatus, keyStatus) {
        if (keyStatus == 'up') {
            return
        }
        if (this.cooldown == 1) {
            if (gunStatus) {
                this.addBullet_2()
            } else {
                this.addBullet()
            }
        }
        this.cooldown--
    }
    die() {
        var d = PlayerDie.new(this.game)
        d.x = this.x
        d.y = this.y
        this.scene.addElement(d, 'dead')
    }
    update() {
    }
}
