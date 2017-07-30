class Bullet extends GeImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = 10
    }
    update() {
        this.y -= this.speed
    }
}
