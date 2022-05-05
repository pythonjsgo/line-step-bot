import {InlineKeyboard, Keyboard} from "grammy";

export const chooseLanguage = new InlineKeyboard()
    .text('Ru🇷🇺', 'ru')
    .text('Eng🇬🇧', 'en')

export const mainMenuRU = new Keyboard()
    .text('💸 Pre Sale “LITE”')
    .text('Баланс💰')
export const mainMenuEN = new Keyboard()
    .text('💸 Pre Sale “LITE”')
    .text('Balance💰')