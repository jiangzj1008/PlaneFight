class Prop extends GeImage {
    constructor(game, name) {
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = 5
        this.life = 1
    }
    update() {
        this.y += this.speed
        if (this.y > 800) {
            this.life = 0
        }
    }
}

class Prop_gun extends Prop {
    constructor(game) {
        super(game, 'prop1')
        this.setup()
    }
}
class Prop_bomb extends Prop {
    constructor(game) {
        super(game, 'prop2')
        this.setup()
    }
}
