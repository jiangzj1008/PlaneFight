class Particle extends GeImage {
    constructor(game) {
        super(game, 'firework')
        this.setup()
    }
    setup() {
        this.life = 20
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.01
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class ParticleSystem {
    constructor(game, scene, x, y) {
        this.scene = scene
        this.game = game
        this.x = x
        this.y = y
        this.setup()
    }
    static new(game, scene, x, y) {
        return new this(game, scene, x, y)
    }
    setup() {
        this.numberOfParticles = 20
        this.particles = []

        for (var i = 0; i < this.numberOfParticles; i++) {
            var p = Particle.new(this.game)
            var s = 4
            var vx = this.scene.randomBetween(-s, s)
            var vy = this.scene.randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
    }
}
