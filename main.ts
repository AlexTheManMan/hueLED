function prepareHueTransition () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground)
    adjustingHueAndBrightness = 0
    showRainbow()
    basic.pause(5000)
    calcAndTurnHueTransition()
}
function toggleMode () {
    if (!(input.buttonIsPressed(Button.AB))) {
        if (adjustingHueAndBrightness == 0) {
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.JumpUp), music.PlaybackMode.InBackground)
            adjustingHueAndBrightness = 1
        } else {
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.JumpDown), music.PlaybackMode.InBackground)
            adjustingHueAndBrightness = 0
        }
    }
}
function turnOn () {
    music.play(music.builtinPlayableSoundEffect(soundExpression.slide), music.PlaybackMode.InBackground)
    sleepMode = 0
    tileDisplay.setBrightness(bright)
    tileDisplay.showColor(Kitronik_Zip_Tile.colors(ZipLedColors.White))
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
        if (period > 600) {
            period = 600
        }
        periodChanged = 1
    }
    led.plotBarGraph(
    period,
    360
    )
}
input.onButtonPressed(Button.A, function () {
    if (sleepMode == 0) {
        toggleMode()
    }
})
input.onGesture(Gesture.ScreenUp, function () {
    if (sleepMode == 0) {
        if (!(input.buttonIsPressed(Button.AB))) {
            if (runningHueTransition == 0) {
                prepareHueTransition()
            } else {
                music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.InBackground)
                runningHueTransition = 0
            }
        }
    }
})
function printTemperature () {
    temp = input.temperature()
    basic.showString("" + (temp))
    basic.showString("C ")
}
function showHue () {
    tileDisplay.setBrightness(bright)
    tileDisplay.showRainbow(hue, hue)
    tileDisplay.show()
}
function adjustHue () {
    if (runningHueTransition == 0) {
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
radio.onReceivedString(function (receivedString) {
    if (sleepMode == 0) {
        if (receivedString == "bright+") {
            bright += 2
            if (bright > 200) {
                bright = 200
            }
            tileDisplay.setBrightness(bright)
            tileDisplay.show()
        }
        if (receivedString == "bright-") {
            bright += -2
            if (bright < 3) {
                bright = 3
            }
            tileDisplay.setBrightness(bright)
            tileDisplay.show()
        }
        if (receivedString == "hue+") {
            hue += 1
            if (hue > 360) {
                hue = 1
            }
            tileDisplay.showRainbow(hue, hue)
            tileDisplay.show()
        }
        if (receivedString == "hue-") {
            hue += -1
            if (hue < 1) {
                hue = 360
            }
            tileDisplay.showRainbow(hue, hue)
            tileDisplay.show()
        }
        if (receivedString == "period+") {
            period += 5
            if (period > 600) {
                period = 600
            }
            calcAndTurnHueTransition()
        }
        if (receivedString == "period-") {
            period += -5
            if (period < 5) {
                period = 5
            }
            calcAndTurnHueTransition()
        }
        if (receivedString == "sleep") {
            turnOff()
        }
    } else {
        if (receivedString == "wake") {
            turnOn()
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (sleepMode == 0) {
        toggleMode()
    }
})
function turnOff () {
    music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.InBackground)
    sleepMode = 1
    runningHueTransition = 0
    adjustingHueAndBrightness = 0
    tileDisplay.clear()
    tileDisplay.show()
}
function transmit () {
    if (input.runningTime() - lastTransmission >= 1000) {
        if (sleepMode == 0) {
            radio.sendValue("hue", hue)
            radio.sendValue("bright", bright)
            radio.sendValue("period", period)
            radio.sendValue("temp", input.temperature())
        }
        radio.sendValue("sleep", sleepMode)
    }
}
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
        if (bright > 200) {
            bright = 200
        }
        tileDisplay.setBrightness(bright)
        tileDisplay.show()
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    printTemperature()
})
function calcAndTurnHueTransition () {
    hueTransitionDueMS = period * 1000 / 360
    runningHueTransition = 1
}
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
let adjustingHueAndBrightness = 0
let runningHueTransition = 0
let periodChanged = 0
let temp = 0
let lastTransmission = 0
let sleepMode = 0
sleepMode = 0
lastTransmission = 0
temp = 0
periodChanged = 0
runningHueTransition = 0
adjustingHueAndBrightness = 0
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
    if (adjustingHueAndBrightness == 1) {
        adjustHue()
        adjustBrightness()
    }
    if (runningHueTransition == 1) {
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
    transmit()
})
