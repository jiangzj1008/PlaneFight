class Bullet extends GeImage {
    constructor(game, name) {
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = 15
        this.life = 1
    }
    update() {
        this.y -= this.speed
        if (this.y < -this.h || this.y > 800) {
            this.life = 0
        }
    }
}

class Bullet1 extends Bullet {
    constructor(game) {
        super(game, 'bullet1')
    }
}
class Bullet2 extends GeImage {
    constructor(game) {
        super(game, 'bullet2')
        this.setup()
    }
    setup() {
        this.speed = -5
    }
}
