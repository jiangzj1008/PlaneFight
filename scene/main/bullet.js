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
class Bullet3 extends GeImage {
    constructor(game) {
        super(game, 'bullet3')
        this.setup()
    }
    setup() {
        this.speed = 10
        this.life = 1
    }
    update() {
        this.y -= this.speed
        this.x = this.player.x + this.player.w/2
        if (this.y < -this.h || this.y > 800) {
            this.life = 0
        }
    }
}
