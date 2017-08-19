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
    moveLeft() {
        this.move((this.x - this.speed), this.y)
    }
    moveRight() {
        this.move((this.x + this.speed), this.y)
    }
    moveUp() {
        this.move(this.x, (this.y - this.speed))
    }
    moveDown() {
        this.move(this.x, (this.y + this.speed))
    }
    fire() {
        if (this.cooldown == 1) {
            var x = this.x + this.w/2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            b.player = this
            this.scene.addElement(b, 'bullets')
            this.cooldown = 4
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
