import {InlineKeyboard, Keyboard} from "grammy";
import {Language} from "../types";

export const chooseLanguage = new InlineKeyboard()
    .text('Ru🇷🇺', 'ru')
    .text('Eng🇬🇧', 'en')

export const mainMenuRU = new Keyboard()
    .text('💸 Pre Sale “LITE”').row()
    .text('Рефералы👥').row()
    .text('Баланс💰').row()
    .text('Вывод LITE🏃‍♂️').row()
export const mainMenuEN = new Keyboard()
    .text('💸 Pre Sale “LITE”').row()
    .text('Referral👥').row()
    .text('Balance💰').row()


export const mainMenu = (language: Language)=> {
    if (language === 'en'){
        return mainMenuEN
    } else return mainMenuRU
}