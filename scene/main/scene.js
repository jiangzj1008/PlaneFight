class Scene extends GeScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.score = 0
        this.cooldown = 150
        this.elements = {
            backgrounds: [],
            player: [],
            enermys: [],
            dead: [],
            bullets: [],
            bullets_enermy: [],
        }
        this.setupBackground()
        this.setupPlayer()
        this.setupEnermy()
    }
    setupBackground() {
        var game = this.game
        for (var i = 0; i < 2; i++) {
            var bg = Background.new(game)
            bg.y = -853 * i
            this.addElement(bg, 'backgrounds')
        }
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
            var e = Enermy_1.new(this.game)
            this.addElement(e, 'enermys')
        }
        for (var j = 0; j < this.numOfEnermy_2; j++) {
            var e = Enermy_2.new(this.game)
            this.addElement(e, 'enermys')
        }
        for (var k = 0; k < this.numOfEnermy_3; k++) {
            var e = Enermy_3.new(this.game)
            this.addElement(e, 'enermys')
        }
    }
    detect() {
        var enermys = this.elements.enermys
        var player = this.player
        var bullets = this.elements.bullets
        var bullets_enermy = this.elements.bullets_enermy
        // 检测敌机
        for (var i = 0; i < enermys.length; i++) {
            var enermy = enermys[i]
            if (enermy.collide(player)) {
                enermy.life--
                player.life--
                if (player.life == 0) {
                    player.die()
                }
            }
            for (var j = 0; j < bullets.length; j++) {
                var bullet = bullets[j]
                if (enermy.collide(bullet)) {
                    enermy.life--
                    bullet.life--
                }
            }
            if (enermy.life == 0) {
                this.score += enermy.score
                enermy.die()
            }
        }
        // 检测玩家
        for (var k = 0; k < bullets_enermy.length; k++) {
            var b = bullets_enermy[k]
            if (player.collide(b)) {
                b.life--
                player.life--
                if (player.life == 0) {
                    player.die()
                }
            }
        }
        // 检测子弹与子弹
        for (var i = 0; i < bullets.length; i++) {
            var b1 = bullets[i]
            for (var j = 0; j < bullets_enermy.length; j++) {
                var b2 = bullets_enermy[j]
                if (b1.collide(b2)) {
                    b1.life--
                    b2.life--
                }
            }
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
        var text = '得分：' + this.score
        this.game.drawText(text, 0, 25)
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
        this.detect()
        if (this.cooldown == 0) {
            this.cooldown = 100
            this.setupEnermy()
        }
        this.cooldown--
    }
}
