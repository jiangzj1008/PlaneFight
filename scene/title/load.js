class Load extends GeImage {
    constructor(game) {
        super(game, 'loading1')
        this.setup()
    }
    setup() {
        this.life = 1
        this.x = (500 - this.w) / 2
        this.y = (800- this.h) / 2 + 50
        this.setupFrames('loading', 3)
    }
    setupFrames(name, frameNum) {
        var game = this.game
        this.frames = []
        for (var i = 1; i <= frameNum; i++) {
            var n = `${name}${i}`
            var t = game.textureByName(n)
            this.frames.push(t)
        }
        this.texture = this.frames[0]
        this.frameIndex = 0
        this.frameCount = 15
        this.frameNum = frameNum
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 15
            this.frameIndex = (this.frameIndex + 1) % this.frames.length
            this.texture = this.frames[this.frameIndex]
        }
    }
}
