class SceneEnd extends GeScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.elements = {
            backgrounds: [],
        }
        this.setupPlayerEvent()
    }
    setupPlayerEvent() {
        var g = this.game
        var self = this
        g.registerAction('r', function(keyStatus){
            var s = SceneTitle.new(g)
            g.replaceScene(s)
        })
    }
    drawTitle() {
        var img = this.game.images['logo']
        var x = 500/2 - 428/2
        var y = 800/2 - 104/2 - 50
        this.game.context.drawImage(img, x, y)
    }
    drawScore() {
        var text = '得分：' + this.score
        this.game.drawText(text, 200, 450)
    }
    draw() {
        var types = Object.keys(this.elements)
        for (var i = 0; i < types.length; i++) {
            var type = types[i]
            var elements = this.elements[type]
            for (var j = 0; j < elements.length; j++) {
                var e = elements[j]
                this.game.drawImage(e)
            }
        }
        this.drawTitle()
        this.drawScore()
    }
    update() {
        if (window.paused) {
            return
        }
        var types = Object.keys(this.elements)
        for (var i = 0; i < types.length; i++) {
            var type = types[i]
            var elements = this.elements[type]
            for (var j = 0; j < elements.length; j++) {
                var e = elements[j]
                e.update()
            }
        }
    }
}
