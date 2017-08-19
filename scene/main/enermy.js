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
        this.cooldown = 3
        var name = this.name + '_die1'
        this.texture = this.game.textureByName(name)
    }
    update() {
        if (this.cooldown > 0) {
            this.cooldown--
        } else {
            if (this.changeCount < this.changeTimes) {
                var name = this.name + '_die' + (this.changeCount + 1)
                this.texture = this.game.textureByName(name)
                this.changeCount++
                this.cooldown = 3
            } else {
                this.life = 0
            }
        }
    }
}

class Enermy extends GeImage {
    constructor(game, enermy) {
        super(game, enermy)
        this.x = this.randomBetween(0, (500 - this.w))
        this.y = this.randomBetween(1, 4) * -this.h
        this.cooldown = 1
    }
    die() {
        var d = EnermyDie.new(this.game, this.name)
        d.x = this.x
        d.y = this.y
        this.scene.addElement(d, 'dead')
    }
    fire() {
        if (this.cooldown == 1) {
            var x = this.x + this.w/2
            var y = this.y + this.h
            var b = Bullet2.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b, 'bullets_enermy')
            this.cooldown = 80
        }
        this.cooldown--
    }
    update() {
        this.y += this.speed
        this.fire()
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
        this.name = 'enermy_1'
        this.score = 10
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
        this.name = 'enermy_2'
        this.score = 30
        this.life = 10
        this.speed = 4
    }
}

class Enermy_3 extends Enermy {
    constructor(game) {
        super(game, 'enermy_3')
        this.setup()
    }
    setup() {
        this.name = 'enermy_3'
        this.score = 100
        this.life = 40
        this.speed = 3
    }
}
