class Scene extends GeScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.setupBackground()
        this.setupPlayer()
        this.setupEnermy()
    }
    setupBackground() {
        var game = this.game
        var bg1 = Background.new(game, 0)
        var bg2 = Background.new(game, -853)
        this.addElement(bg1)
        this.addElement(bg2)
        this.bgs = [bg1, bg2]
    }
    setupPlayer() {
        var game = this.game
        this.player = Player.new(game)
        this.addElement(this.player)
        this.setupPlayerEvent()
    }
    setupPlayerEvent() {
        var g = this.game
        var p = this.player
        g.registerAction('a', function(){
            p.moveLeft()
        })
        g.registerAction('d', function(){
            p.moveRight()
        })
        g.registerAction('w', function(){
            p.moveUp()
        })
        g.registerAction('s', function(){
            p.moveDown()
        })
        g.registerAction('j', function(){
            p.fire()
        })
    }
    setupEnermy() {
        this.numOfEnermy_1 = this.randomBetween(3, 4)
        this.numOfEnermy_2 = this.randomBetween(1, 2)
        this.numOfEnermy_3 = 1

        this.addEnermies()
    }
    addEnermies() {
        var es = []
        for (var i = 0; i < this.numOfEnermy_1; i++) {
            var e = Enermy.new(this.game, 'enermy_1')
            es.push(e)
            this.addElement(e)
        }
        for (var j = 0; j < this.numOfEnermy_2; j++) {
            var e = Enermy.new(this.game, 'enermy_2')
            es.push(e)
            this.addElement(e)
        }
        for (var k = 0; k < this.numOfEnermy_3; k++) {
            var e = Enermy.new(this.game, 'enermy_3')
            es.push(e)
            this.addElement(e)
        }
        this.enermies = es
    }
}
