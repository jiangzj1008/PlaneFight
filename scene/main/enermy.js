class EnermyDie extends GeImage {
    constructor(game, enermy) {
        super(game, enermy)
        this.name = enermy
        this.setup()
    }
    setup() {
        this.life = 1
        this.changeCount = 1
        this.changeTimes = 3
        var name = this.name + '_die'
        this.texture = this.game.textureByName(name)
    }
    update() {
        if (this.changeCount < this.changeTimes) {
            this.changeCount++
            var name = this.name + '_die' + this.changeCount
            this.texture = this.game.textureByName(name)
        } else {
            this.life = 0
        }
    }
}


class Enermy extends GeImage {
    constructor(game, enermy) {
        super(game, enermy)
        this.name = enermy
        this.setup()
    }
    setup() {
        this.life = 1
        this.x = this.randomBetween(0, (500 - this.w))
        this.y = this.randomBetween(1, 4) * -this.h
        this.speed = this.randomBetween(3, 6)
    }
    die() {
        var d = EnermyDie.new(this.game, this.name)
        d.x = this.x
        d.y = this.y
        this.scene.addElement(d, 'dead')
    }
    update() {
        this.y += this.speed
        if (this.y > 800 || this.life == 0) {
            this.die()
        }
    }
}
