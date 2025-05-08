input.onButtonPressed(Button.AB, function () {
    showRainbow()
})
radio.onReceivedValue(function (name, value) {
    if (name == "bright") {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
        bright = value
        showRainbow()
    }
})
function showRainbow () {
    tileDisplay.setBrightness(bright)
    tileDisplay.showRainbow(1, 360)
}
let tileDisplay: Kitronik_Zip_Tile.ZIPTileDisplay = null
let bright = 0
music.setVolume(16)
radio.setGroup(1)
bright = 16
tileDisplay = Kitronik_Zip_Tile.createZIPTileDisplay(1, 1, Kitronik_Zip_Tile.UBitLocations.Hidden)
basic.forever(function () {
	
})
