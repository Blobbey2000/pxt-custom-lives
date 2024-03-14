namespace SpriteKind {
    export const Life = SpriteKind.create()
}

let column = 0
let row = 0
let space = 0
let chosenSprite: Sprite = null
let chosenSpriteImage: Image = null
let lifeXPosition = 0
let lifeYPosition = 0

//% color="#5D275D"
//% icon="\uf004"
//% blockGap=8
//% block="Custom Lives"
//% groups="Create", "Change", "Extra"
namespace CustomLives {

    //% group="Create"
    //% weight=2
    //% block="set life image to $image=screen_image_picker with $columns lives $spacing pixels apart"
    export function setLifeImageAndMax(image: Image, columns: number, spacing: number) {
        column = 0
        space = spacing
        chosenSpriteImage = image
        for (let index = 0; index < columns; index++) {
            let myLifeSprite = sprites.create(image, SpriteKind.Life)
            myLifeSprite.z = 1000000
            myLifeSprite.setFlag(SpriteFlag.RelativeToCamera, true)
            myLifeSprite.x = column
            sprites.setDataNumber(myLifeSprite, "Position", column)
            column += myLifeSprite.image.width + spacing
        }
    }

    //% group="Create"
    //% weight=1
    //% block="set life position to x $x y $y"
    export function setLifePosition(x: number, y: number) {
        lifeXPosition = x
        lifeYPosition = y
        for (let value of sprites.allOfKind(SpriteKind.Life)) {
            value.setPosition(x + sprites.readDataNumber(value, "Position"), y)
        }
    }

    //% group="Change"
    //% weight=3
    //% block="lose life"
    export function loseLife() {
        if (sprites.allOfKind(SpriteKind.Life).length >= 1) {
            chosenSprite = sprites.allOfKind(SpriteKind.Life)[sprites.allOfKind(SpriteKind.Life).length - 1]
            column -= chosenSprite.image.width + space
            sprites.destroy(chosenSprite)
        }
    }

    //% group="Extra"
    //% weight=1
    //% block="lives"
    export function lives() {
        return sprites.allOfKind(SpriteKind.Life).length;
    }

    //% group="Change"
    //% weight=2
    //% block="gain life"
    export function gainLife() {
        let myLifeSprite = sprites.create(chosenSpriteImage, SpriteKind.Life)
        myLifeSprite.z = 1000000
        myLifeSprite.setFlag(SpriteFlag.RelativeToCamera, true)
        myLifeSprite.x = column
        sprites.setDataNumber(myLifeSprite, "Position", column)
        column += myLifeSprite.image.width + space
        for (let value of sprites.allOfKind(SpriteKind.Life)) {
            value.setPosition(lifeXPosition + sprites.readDataNumber(value, "Position"), lifeYPosition)
        }
    }
}