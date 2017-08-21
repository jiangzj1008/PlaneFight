var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            window.paused = !window.paused
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var inputPng = function(images, name, number) {
    for (var i = 1; i <= number; i++) {
        var key = name + i
        var value = `img/${key}.png`
        images[key] = value
    }
}

var __main = function() {
    var images = {
        player: 'img/player.png',
        player_die1: 'img/player_die1.png',
        player_die2: 'img/player_die2.png',
        player_die3: 'img/player_die3.png',
        player_die4: 'img/player_die4.png',
        prop1: 'img/prop1.png',
        prop2: 'img/prop2.png',
        bullet1: 'img/bullet1.png',
        bullet2: 'img/bullet2.png',
        background: 'img/bg.jpg',
        enermy_1: 'img/enermy1.png',
        enermy_1_die1: 'img/enermy1_die1.png',
        enermy_1_die2: 'img/enermy1_die2.png',
        enermy_1_die3: 'img/enermy1_die3.png',
        enermy_2: 'img/enermy2.png',
        enermy_2_die1: 'img/enermy2_die1.png',
        enermy_2_die2: 'img/enermy2_die2.png',
        enermy_2_die3: 'img/enermy2_die3.png',
        enermy_3: 'img/enermy3.png',
        enermy_3_die1: 'img/enermy3_die1.png',
        enermy_3_die2: 'img/enermy3_die2.png',
        enermy_3_die3: 'img/enermy3_die3.png',
        bomb: 'img/bomb.png',
        gun: 'img/gun.png',
        life: 'img/life.png',
        logo: 'img/logo.png',
        firework: 'img/firework.png',
    }

    inputPng(images, 'loading', 3)

    var game = GeGame.instance(30, images, function(g) {
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
