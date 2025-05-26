function prepareHueTransition () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground)
    _3gToggle = 0
    showRainbow()
    basic.pause(5000)
    hueTransitionDueMS = period * 1000 / 360
    screenUpToggle = 1
}
function toggleMode () {
    if (!(input.buttonIsPressed(Button.AB))) {
        if (_3gToggle == 0) {
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.JumpUp), music.PlaybackMode.InBackground)
            _3gToggle = 1
        } else {
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.JumpDown), music.PlaybackMode.InBackground)
            _3gToggle = 0
        }
    }
}
function adjustPeriod () {
    angle = input.rotation(Rotation.Roll)
    if (angle >= -150 && angle <= -30) {
        period += -1
        if (period < 5) {
            period = 5
        }
        periodChanged = 1
    }
    if (angle <= 150 && angle >= 30) {
        period += 1
        if (period > 360) {
            period = 360
        }
        periodChanged = 1
    }
    led.plotBarGraph(
    period,
    360
    )
}
input.onButtonPressed(Button.A, function () {
    toggleMode()
})
input.onGesture(Gesture.ScreenUp, function () {
    if (!(input.buttonIsPressed(Button.AB))) {
        if (screenUpToggle == 0) {
            prepareHueTransition()
        } else {
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.InBackground)
            screenUpToggle = 0
        }
    }
})
function printTemperature () {
    temp = input.temperature()
    basic.showString("" + (temp))
    basic.showString("C")
}
function showHue () {
    tileDisplay.setBrightness(bright)
    tileDisplay.showRainbow(hue, hue)
    tileDisplay.show()
}
function adjustHue () {
    if (screenUpToggle == 0) {
        angle = input.rotation(Rotation.Roll)
        if (angle >= -150 && angle <= -30) {
            hue += -0.5
            if (hue < 1) {
                hue = 360
            }
            tileDisplay.showRainbow(hue, hue)
            tileDisplay.show()
        }
        if (angle <= 150 && angle >= 30) {
            hue += 0.5
            if (hue > 360) {
                hue = 1
            }
            tileDisplay.showRainbow(hue, hue)
            tileDisplay.show()
        }
    }
}
input.onButtonPressed(Button.B, function () {
    toggleMode()
})
radio.onReceivedValue(function (name, value) {
    if (name == "bright") {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
        bright = value
        showHue()
    }
    if (name == "hue") {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
        hue = value
        screenUpToggle = 0
        showHue()
    }
    if (name == "period") {
        period = value
        prepareHueTransition()
    }
})
function adjustBrightness () {
    angle = input.rotation(Rotation.Pitch)
    if (angle >= -150 && angle <= -30) {
        bright += -0.2
        if (bright < 3) {
            bright = 3
        }
        tileDisplay.setBrightness(bright)
        tileDisplay.show()
    }
    if (angle <= 150 && angle >= 30) {
        bright += 0.2
        if (bright > 128) {
            bright = 128
        }
        tileDisplay.setBrightness(bright)
        tileDisplay.show()
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    printTemperature()
})
function showRainbow () {
    tileDisplay.setBrightness(bright)
    tileDisplay.showRainbow(1, 360)
    tileDisplay.show()
}
function hueTransition () {
    if (input.runningTime() - lastHueTransitionTime >= hueTransitionDueMS) {
        hue += 1
        if (hue > 360) {
            hue = 1
        }
        showHue()
        lastHueTransitionTime = input.runningTime()
    }
}
let angle = 0
let tileDisplay: Kitronik_Zip_Tile.ZIPTileDisplay = null
let hue = 0
let bright = 0
let lastHueTransitionTime = 0
let hueTransitionDueMS = 0
let period = 0
let _3gToggle = 0
let screenUpToggle = 0
let periodChanged = 0
let temp = 0
temp = 0
periodChanged = 0
screenUpToggle = 0
_3gToggle = 0
period = 180
hueTransitionDueMS = 0
lastHueTransitionTime = 0
music.setVolume(16)
radio.setGroup(1)
bright = 16
hue = 180
tileDisplay = Kitronik_Zip_Tile.createZIPTileDisplay(1, 1, Kitronik_Zip_Tile.UBitLocations.Hidden)
tileDisplay.setBrightness(bright)
tileDisplay.showColor(Kitronik_Zip_Tile.colors(ZipLedColors.White))
basic.forever(function () {
    if (_3gToggle == 1) {
        adjustHue()
        adjustBrightness()
    }
    if (screenUpToggle == 1) {
        hueTransition()
    }
    if (input.buttonIsPressed(Button.AB)) {
        adjustPeriod()
    } else {
        if (periodChanged == 1) {
            basic.showString("" + (period))
            basic.showString("secs")
            periodChanged = 0
        }
    }
})
