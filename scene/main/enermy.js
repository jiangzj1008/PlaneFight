class Enermy extends GeImage {
    constructor(game, enermy) {
        super(game, enermy)
        this.setup()
    }
    setup() {
        this.x = this.randomBetween(0, (500 - this.w))
        this.y = this.randomBetween(1, 4) * -this.h
        this.speed = this.randomBetween(3, 6)
    }
    update() {
        this.y += this.speed
        if (this.y > 800) {
            this.setup()
        }
    }

}
