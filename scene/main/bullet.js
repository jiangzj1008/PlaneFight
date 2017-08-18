class Bullet extends GeImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = 10
        this.life = 1
    }
    update() {
        this.y -= this.speed
        if (this.y < -this.h || this.y > 800) {
            this.life = 0
        }
    }
}
