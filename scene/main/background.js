class Background extends GeImage {
    constructor(game, startPoint) {
        super(game, 'background')
        this.startPoint = startPoint
        this.setup()
    }
    setup() {
        this.y = this.startPoint
        this.speed = 10
        this.life = 1
    }
    update() {
        // this.y += this.speed
        // console.log(this.startPoint, this.y);
        // if (this.y > 853) {
        //     this.setup()
        // }
    }
}
