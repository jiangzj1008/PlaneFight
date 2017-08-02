class Scene extends GeScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.cooldown = 150
        this.elements = {
            backgrounds: [],
            player: [],
            enermys: [],
            dead: [],
            bullets: [],
        }
        this.setupBackground()
        this.setupPlayer()
        this.setupEnermy()
    }
    setupBackground() {
        var game = this.game
        var bg1 = Background.new(game, 0)
        var bg2 = Background.new(game, -853)
        this.addElement(bg1, 'backgrounds')
        this.addElement(bg2, 'backgrounds')
        this.bgs = [bg1, bg2]
    }
    setupPlayer() {
        var game = this.game
        this.player = Player.new(game)
        this.addElement(this.player, 'player')
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
        this.numOfEnermy_1 = this.randomBetween(2, 3)
        this.numOfEnermy_2 = this.randomBetween(0, 1)
        this.numOfEnermy_3 = this.randomBetween(0, 1)

        this.addEnermies()
    }
    addEnermies() {
        for (var i = 0; i < this.numOfEnermy_1; i++) {
            var e = Enermy.new(this.game, 'enermy_1')
            this.addElement(e, 'enermys')
        }
        for (var j = 0; j < this.numOfEnermy_2; j++) {
            var e = Enermy.new(this.game, 'enermy_2')
            this.addElement(e, 'enermys')
        }
        for (var k = 0; k < this.numOfEnermy_3; k++) {
            var e = Enermy.new(this.game, 'enermy_3')
            this.addElement(e, 'enermys')
        }
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
                } else {
                    elements.splice(j, 1)
                }
            }
        }
    }
    update() {
        var types = Object.keys(this.elements)
        for (var i = 0; i < types.length; i++) {
            var type = types[i]
            var elements = this.elements[type]
            for (var j = 0; j < elements.length; j++) {
                var e = elements[j]
                e.update()
            }

            if (type == 'enermys') {
                for (var k = 0; k < elements.length; k++) {
                    var enermy = elements[k]
                    for (var l = 0; l < this.elements.player.length; l++) {
                        var player = this.elements.player[l]
                        if (enermy.collide(player)) {
                            enermy.life--
                            player.life--
                        }
                    }
                    for (var l = 0; l < this.elements.bullets.length; l++) {
                        var bullet = this.elements.bullets[l]
                        if (enermy.collide(bullet)) {
                            enermy.life--
                            bullet.life--
                        }
                    }
                }
            }

        }
        if (this.cooldown == 0) {
            this.cooldown = 100
            this.setupEnermy()
        }
        this.cooldown--
    }
}
