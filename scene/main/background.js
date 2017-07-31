class Background extends GeImage {
    constructor(game, y) {
        super(game, 'background')
        this.startPoint = y
        this.setup()
    }
    setup() {
        this.y = this.startPoint
        this.speed = 10
    }
    // update() {
    //     this.y += this.speed
    //     // if (this.y > this.h) {
    //     //     this.y = this.startPoint
    //     // }
    // }
}
