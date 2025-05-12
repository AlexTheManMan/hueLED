input.onButtonPressed(Button.A, function () {
    showHue(hue)
})
function showHue (hue: number) {
    tileDisplay.setBrightness(bright)
    tileDisplay.showRainbow(hue, hue)
    tileDisplay.show()
}
input.onButtonPressed(Button.B, function () {
    showRainbow()
})
radio.onReceivedValue(function (name, value) {
    if (name == "bright") {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
        bright = value
        showRainbow()
    }
    if (name == "hue") {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
        hue = value
        showHue(hue)
    }
})
input.onGesture(Gesture.ThreeG, function () {
    if (_3gToggle == 0) {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
        _3gToggle = 1
        basic.pause(500)
    } else {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.JumpUp), music.PlaybackMode.InBackground)
        _3gToggle = 0
    }
})
function showRainbow () {
    tileDisplay.setBrightness(bright)
    tileDisplay.showRainbow(1, 360)
    tileDisplay.show()
}
let angle = 0
let tileDisplay: Kitronik_Zip_Tile.ZIPTileDisplay = null
let hue = 0
let bright = 0
let _3gToggle = 0
_3gToggle = 0
music.setVolume(16)
radio.setGroup(1)
bright = 16
hue = 180
tileDisplay = Kitronik_Zip_Tile.createZIPTileDisplay(1, 1, Kitronik_Zip_Tile.UBitLocations.Hidden)
tileDisplay.setBrightness(bright)
tileDisplay.showColor(Kitronik_Zip_Tile.colors(ZipLedColors.White))
basic.forever(function () {
    if (_3gToggle == 1) {
        angle = input.rotation(Rotation.Roll)
        if (angle >= -140 && angle <= -90) {
            hue += -1
            if (hue < 1) {
                hue = 360
            }
            tileDisplay.showRainbow(hue, hue)
            tileDisplay.show()
        }
        if (angle <= 140 && angle >= 90) {
            hue += 1
            if (hue > 360) {
                hue = 1
            }
            tileDisplay.showRainbow(hue, hue)
            tileDisplay.show()
        }
        angle = input.rotation(Rotation.Pitch)
        if (angle >= -140 && angle <= -90) {
            bright += -0.2
            if (bright < 3) {
                bright = 3
            }
            tileDisplay.setBrightness(bright)
            tileDisplay.show()
        }
        if (angle <= 140 && angle >= 90) {
            bright += 0.2
            if (bright > 32) {
                bright = 32
            }
            tileDisplay.setBrightness(bright)
            tileDisplay.show()
        }
    }
})
