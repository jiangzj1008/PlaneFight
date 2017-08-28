class GeScene {
    constructor(game) {
        this.game = game
        this.elements = {}
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(img, type) {
        img.scene = this
        this.elements[type].push(img)
    }
    randomBetween(start, end) {
        var x = Math.random() * (end - start + 1)
        return Math.floor(x + start)
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
                    j--
                }
            }
        }
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
