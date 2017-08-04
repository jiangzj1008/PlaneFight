var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        player: 'img/player.png',
        player_die1: 'img/player_die1.png',
        player_die2: 'img/player_die2.png',
        player_die3: 'img/player_die3.png',
        player_die4: 'img/player_die4.png',
        bullet: 'img/bullet.png',
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
    }

    var game = GeGame.instance(30, images, function(g) {
        var s = Scene.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
