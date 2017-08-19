class Bullet extends GeImage {
    constructor(game) {
        super(game, 'bullet')
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
class Bullet2 extends GeImage {
    constructor(game) {
        super(game, 'bullet2')
        this.setup()
    }
    setup() {
        this.speed = -5
        this.life = 1
    }
    update() {
        this.y -= this.speed
        if (this.y < -this.h || this.y > 800) {
            this.life = 0
        }
    }
}
