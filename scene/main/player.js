class Player extends GeImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.life = 1
        this.bullets = []
        this.x = (500 - this.w) / 2
        this.y = 800 - this.h - 50
        this.speed = 15
        this.cooldown = 1
    }
    move(x, y) {
        if (x < 0) {
            x = 0
        } else if (x > 500 - this.w) {
            x = 500 - this.w
        }
        if (y < 0) {
            y = 0
        } else if (y > 800 - this.h) {
            y = 800 - this.h
        }
        this.x = x
        this.y = y
    }
    moveLeft() {
        this.move((this.x - this.speed), this.y)
    }
    moveRight() {
        this.move((this.x + this.speed), this.y)
    }
    moveUp() {
        this.move(this.x, (this.y - this.speed))
    }
    moveDown() {
        this.move(this.x, (this.y + this.speed))
    }
    fire() {
        if (this.cooldown == 1) {
            var x = this.x + this.w/2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b, 'bullets')
            this.cooldown = 4
        }
        this.cooldown--
    }
    update() {
    }
}


// var Player = function(game) {
//     var aInb = function(x, x1, x2) {
//         return x >= x1 && x <= x2
//     }
//     o.collide = function(ball) {
//         var a = o
//         var b = ball
//         if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
//             if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
//                 return true
//             }
//         }
//         return false
//     }
//     return o
// }
