input.onButtonPressed(Button.A, function () {
    showHue(hue)
})
function showHue (hue: number) {
    tileDisplay.setBrightness(bright)
    tileDisplay.showRainbow(hue, hue)
}
input.onButtonPressed(Button.B, function () {
    showRainbow()
})
input.onGesture(Gesture.Shake, function () {
	
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
function showRainbow () {
    tileDisplay.setBrightness(bright)
    tileDisplay.showRainbow(1, 360)
}
let height = 0
let tileDisplay: Kitronik_Zip_Tile.ZIPTileDisplay = null
let hue = 0
let bright = 0
let prevHeight = 0
let diff = 0
music.setVolume(16)
radio.setGroup(1)
bright = 16
hue = 180
tileDisplay = Kitronik_Zip_Tile.createZIPTileDisplay(1, 1, Kitronik_Zip_Tile.UBitLocations.Hidden)
tileDisplay.setBrightness(bright)
basic.forever(function () {
    if (input.logoIsPressed()) {
        height = Math.round(input.acceleration(Dimension.Z) / 100)
        if (height <= 9) {
            tileDisplay.showColor(Kitronik_Zip_Tile.colors(ZipLedColors.Green))
        }
        if (height >= 11) {
            tileDisplay.showColor(Kitronik_Zip_Tile.colors(ZipLedColors.Orange))
        }
    }
})
