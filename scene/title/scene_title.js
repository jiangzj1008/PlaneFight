class SceneTitle extends GeScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.elements = {
            backgrounds: [],
            load: [],
        }
        this.setupBackground()
        this.setupLoading()
        this.setupPlayerEvent()
    }
    setupBackground() {
        var game = this.game
        for (var i = 0; i < 2; i++) {
            var bg = Background.new(game)
            bg.y = -853 * i
            this.addElement(bg, 'backgrounds')
        }
    }
    setupPlayerEvent() {
        var g = this.game
        var self = this
        g.registerAction('k', function(keyStatus){
            var s = Scene.new(g)
            s.elements.backgrounds = self.elements.backgrounds
            g.replaceScene(s)
        })
    }
    setupLoading() {
        var g = this.game
        var l = Load.new(g)
        this.addElement(l, 'load')
    }
    drawTitle() {
        var img = this.game.images['logo']
        var x = 500/2 - 428/2
        var y = 800/2 - 104/2 - 50
        this.game.context.drawImage(img, x, y)
    }
    draw() {
        super.draw()
        this.drawTitle()
    }
}
