class Scene extends GeScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.score = 0
        this.cooldown = 150
        this.gunRewardScore = 0
        this.bombRewardScore = 0
        this.gun = false
        this.bombNum = 0
        this.elements = {
            backgrounds: [],
            player: [],
            enermys: [],
            dead: [],
            bullets: [],
            bullets_enermy: [],
            prop_gun: [],
            prop_bomb: [],
            fire: [],
        }
        this.setupPlayer()
        this.setupEnermy()
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
        var self = this
        g.registerAction('a', function(keyStatus){
            p.moveLeft(keyStatus)
        })
        g.registerAction('d', function(keyStatus){
            p.moveRight(keyStatus)
        })
        g.registerAction('w', function(keyStatus){
            p.moveUp(keyStatus)
        })
        g.registerAction('s', function(keyStatus){
            p.moveDown(keyStatus)
        })
        g.registerAction('j', function(keyStatus){
            p.fire(self.gun, keyStatus)
        })
        g.registerAction('b', function(keyStatus){
            self.bomb(keyStatus)
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
    addProps() {
        if (this.gunRewardScore > 400) {
            var e = Prop_gun.new(this.game)
            e.x = this.randomBetween(100, 400)
            e.y = this.randomBetween(-100, -50)
            this.addElement(e, 'prop_gun')
            this.gunRewardScore = 0
        } else if (!this.gun) {
            this.gunRewardScore++
        }
        if (this.bombRewardScore > 500) {
            var e = Prop_bomb.new(this.game)
            e.x = this.randomBetween(100, 400)
            e.y = this.randomBetween(-100, -50)
            this.addElement(e, 'prop_bomb')
            this.bombRewardScore = 0
        } else {
            this.bombRewardScore++
        }
    }
    bomb(keyStatus) {
        if (this.bombNum <= 0 || keyStatus == 'down') {
            return
        }
        var enermys = this.elements.enermys
        var bullets = this.elements.bullets_enermy
        for (var i = 0; i < enermys.length; i++) {
            var e = enermys[i]
            this.shootDown(e)
        }
        for (var i = 0; i < bullets.length; i++) {
            var b = bullets[i]
            b.life = 0
        }
        this.bombNum--
    }

    end() {
        var g = this.game
        var self = this
        self.player.die()
        self.elements.player = []
        var s = SceneEnd.new(g)
        s.elements.backgrounds = self.elements.backgrounds
        s.score = self.score
        setTimeout(function () {
            g.replaceScene(s)
        }, 500)
    }
    shootDown(enermy) {
        enermy.life = 0
        this.score += enermy.score
        enermy.die()
        var self = this
        var x = enermy.x + enermy.w/2
        var y = enermy.y + enermy.w/2
        var fire = ParticleSystem.new(self.game, self, x, y)
        for (var i = 0; i < fire.particles.length; i++) {
            var f = fire.particles[i]
            self.elements.fire.push(f)
        }
    }
    detectPlayer() {
        var player = this.player
        var bullets_enermy = this.elements.bullets_enermy
        // 检测玩家
        for (var k = 0; k < bullets_enermy.length; k++) {
            var b = bullets_enermy[k]
            if (player.collide(b)) {
                this.gun = false
                b.life--
                player.life--
                if (player.life <= 0) {
                    this.end()
                }
            }
        }
    }
    detectEnermys() {
        var enermys = this.elements.enermys
        var player = this.player
        var bullets = this.elements.bullets
        // 检测敌机
        for (var i = 0; i < enermys.length; i++) {
            var enermy = enermys[i]
            if (enermy.collide(player)) {
                enermy.life--
                player.life--
                if (player.life <= 0) {
                    this.end()
                }
            }
            for (var j = 0; j < bullets.length; j++) {
                var bullet = bullets[j]
                if (enermy.collide(bullet)) {
                    enermy.life--
                    bullet.life--
                }
            }
            if (enermy.life <= 0) {
                this.shootDown(enermy)
            }
        }
    }
    detectBullets() {
        var bullets = this.elements.bullets
        var bullets_enermy = this.elements.bullets_enermy
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
    detectProps() {
        var player = this.player
        var prop_gun = this.elements.prop_gun
        var prop_bomb = this.elements.prop_bomb
        // 检测道具1
        for (var i = 0; i < prop_gun.length; i++) {
            var prop = prop_gun[i]
            if (player.collide(prop)) {
                this.gun = true
                prop.life--
                player.life++
            }
        }
        // 检测道具2
        for (var i = 0; i < prop_bomb.length; i++) {
            var prop = prop_bomb[i]
            if (player.collide(prop)) {
                this.bombNum++
                prop.life--
            }
        }
    }
    updateEnermy() {
        if (this.cooldown == 0) {
            this.cooldown = 100
            this.setupEnermy()
        }
        this.cooldown--
    }
    drawProps() {
        if (this.bombNum > 0) {
            var img = this.game.images['bomb']
            this.game.context.drawImage(img, 0, 690)
            var text = '*' + this.bombNum
            this.game.drawText(text, 70, 720)
        }
        if (this.gun) {
            var img = this.game.images['gun']
            this.game.context.drawImage(img, 0, 640)
        }
        if (this.player.life > 0) {
            var img = this.game.images['life']
            this.game.context.drawImage(img, 5, 740)
            var text = '*' + this.player.life
            this.game.drawText(text, 70, 780)
        }
    }
    drawScore() {
        var text = '得分：' + this.score
        this.game.drawText(text, 0, 25)
    }
    detect() {
        this.detectPlayer()
        this.detectEnermys()
        this.detectBullets()
        this.detectProps()
    }
    draw() {
        super.draw()
        this.drawProps()
        this.drawScore()
    }
    update() {
        super.update()
        this.updateEnermy()
        this.detect()
        this.addProps()
    }
}
