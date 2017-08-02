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
        this.setup(enermy)
    }
    setup(enermy) {
        this.life = 1
        this.name = enermy
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
        if (this.y > 800) {
            this.die()
        }
    }
}

class Enermy_1 extends Enermy {
    constructor(game) {
        super(game, 'enermy_1')
        this.setup()
    }
    setup() {
        this.life = 1
        this.speed = 4
    }
}

class Enermy_2 extends Enermy {
    constructor(game) {
        super(game, 'enermy_2')
        this.setup()
    }
    setup() {
        this.life = 3
        this.speed = 4
    }
}

class Enermy_3 extends Enermy {
    constructor(game) {
        super(game, 'enermy_3')
        this.setup()
    }
    setup() {
        this.life = 6
        this.speed = 2
    }
}
