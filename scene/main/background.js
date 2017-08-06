class Background extends GeImage {
    constructor(game) {
        super(game, 'background')
        this.setup()
    }
    setup() {
        this.speed = 2
        this.life = 1
        this.skipCount = 425
    }
    update() {
        this.skipCount--
        if (this.skipCount == 0) {
            this.y -= 850
            this.skipCount = 425
        }
        this.y += this.speed
    }
}
