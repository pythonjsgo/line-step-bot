import {Bot, session} from 'grammy'
import {I18n, pluralize} from '@grammyjs/i18n'
import * as keyboards from './assets/keyboards'
import * as config from '../config'
import {dbManager, getLanguage, redis, setLanguage} from './db-manager'

import {Language, UserData} from "./types";
import startHandler from './handlers/commands/start'
import textHandler from './middlewares/text'
import balanceHandler from './handlers/hears/balance'
import {handleReferral} from "./logic";
import {BONUS_PER_ONE_REFERRAL, MINIMUM_WITHDRAWAL_AMOUNT} from "../config";
import text from "./middlewares/text";
import languageChecker from "./middlewares/languageChecker";
import languageChoice from "./handlers/queries/language";

const i18n = new I18n({
    defaultLanguage: 'ru',
    defaultLanguageOnMissing: true,
    directory: 'assets/locales',
    useSession: true
})

export const bot = new Bot(config.TOKEN)
bot.use(<any>session())
bot.use(<any>i18n.middleware())
bot.on('message:text', textHandler)
bot.callbackQuery(['en','ru'], languageChoice)
// @ts-ignore
bot.use(languageChecker)
// Auto answer
bot.on('callback_query', (ctx, next) => {
    ctx.answerCallbackQuery()
    next()
})

bot.command('dev', async ctx => ctx.reply(JSON.stringify(ctx.message, null, 2)))
bot.command('start', startHandler)
bot.hears('💸 Pre Sale “LITE”', (ctx: any) => ctx.reply(ctx.i18n.t('pre-sale'), {parse_mode: "HTML"}))
bot.hears(['Баланс💰', 'Balance💰'], balanceHandler)
bot.hears('Рефералы👥', async (ctx: any) => {
    const userID = ctx.from.id
    const db = await dbManager
    let userData = await db.users.findOne({userID})
    let referralUrl = `${config.BOT_LINK}?start=r${userID}`
    await ctx.reply(ctx.i18n.t('referrals', {
        balance: userData?.balance || 0,
        profit: userData?.profit || 0,
        invited: userData?.referrals?.length || 0,
        minimumWithdrawalAmount: config.MINIMUM_WITHDRAWAL_AMOUNT,
        BONUS_PER_ONE_REFERRAL,
        referralUrl
    }), {parse_mode: "HTML"})
})




bot.hears(['ИНФО💁‍♀️', 'INFO💁‍♀'], ctx => {
    ctx.reply(`<b>🌐Website</b> - <a href="https://lite-step.com/">Lite Step</a>
<b>💸Website</b> - <a href="https://lite-step.shop/">PreSale</a>
<b>💎Telegram</b> - <a href="https://t.me/lite_step_en">Lite Step</a>
<b>💎Telegram</b> - <a href="https://t.me/lite_step_ru">Lite Step RU</a>
<b>🐣Twitter</b> - <a href="https://twitter.com/lite_step">Lite Step</a>`, {parse_mode: "HTML"})
})
bot.start()