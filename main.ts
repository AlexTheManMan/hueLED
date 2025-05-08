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
    basic.pause(500)
    tileDisplay.rotate(50)
    tileDisplay.show()
}
let tileDisplay: Kitronik_Zip_Tile.ZIPTileDisplay = null
let hue = 0
let bright = 0
music.setVolume(16)
radio.setGroup(1)
bright = 16
hue = 180
tileDisplay = Kitronik_Zip_Tile.createZIPTileDisplay(1, 1, Kitronik_Zip_Tile.UBitLocations.Hidden)
basic.forever(function () {
	
})
