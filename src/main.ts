import {Bot, session} from 'grammy'
import {I18n, pluralize} from '@grammyjs/i18n'
import * as keyboards from './assets/keyboards'
import * as config from '../config'
import {dbManager, redis}  from './db-manager'

const i18n = new I18n({
    defaultLanguage: 'ru',
    defaultLanguageOnMissing: true,
    directory: 'assets/locales'
})

export const bot = new Bot(config.TOKEN)
bot.use(<any>session())


bot.on('callback_query', (ctx, next) => {
    ctx.answerCallbackQuery()
    next()
})

bot.command('dev', async ctx => {
    const userID = ctx?.from?.id
    await redis.set('userID', 'value-test')
    ctx.reply(JSON.stringify(ctx.from, null, 2))
})
bot.command('start', async ctx => {
    //choosing language
    const db =
    await ctx.reply('Выберете язык', {reply_markup: keyboards.chooseLanguage})
})
bot.hears('💸 Pre Sale “LITE”', ctx => {
    ctx.reply('<b>💰Купить наш токен “LITE” вы можете на закрытой продаже на сайте - </b>https://lite-step.shop', {parse_mode: "HTML"})
})
bot.hears('Баланс💰', async ctx => {
    const db = await dbManager
    let userData = db.users.findOne({userID: ctx?.from?.id})
    await ctx.reply(`${userData}`)
})



bot.callbackQuery(['en','ru'], ctx => {
    const data = ctx.callbackQuery.data

    if (data === 'en'){
        ctx.editMessageText('')
    }
    if (data === 'ru'){

    }

})
bot.hears('ИНФО💁‍♀️', ctx => {
    ctx.reply(`<b>🌐Website</b> - <a href="https://lite-step.com/">Lite Step</a>
<b>💸Website</b> - <a href="https://lite-step.shop/">PreSale</a>
<b>💎Telegram</b> - <a href="https://t.me/lite_step_en">Lite Step</a>
<b>💎Telegram</b> - <a href="https://t.me/lite_step_ru">Lite Step RU</a>
<b>🐣Twitter</b> - <a href="https://twitter.com/lite_step">Lite Step</a>`, {parse_mode: "HTML"})
})
bot.start()