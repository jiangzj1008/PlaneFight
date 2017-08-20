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
        var types = Object.keys(this.elements)
        for (var i = 0; i < types.length; i++) {
            var type = types[i]
            var elements = this.elements[type]
            for (var j = 0; j < elements.length; j++) {
                var e = elements[j]
                if (e.life > 0) {
                    this.game.drawImage(e)
                }
            }
        }
        this.drawTitle()
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
