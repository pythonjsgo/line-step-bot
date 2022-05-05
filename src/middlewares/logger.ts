import {NextFunction} from "grammy";
import fs from 'fs'


export const logError = (error: any) => {
    fs.appendFile('log.json', JSON.stringify({type: 'error', error: error.toJSON()}, null, 2), ()=>{})
}

export const middleware = async (ctx: any, next: NextFunction) => {
    if (ctx.callbackQuery) {
        ctx.answerCallbackQuery()
        console.log('another callbackQuery happened', ctx.callbackQuery.data.length, ctx.callbackQuery.data)
    }

    fs.appendFile('log.json', JSON.stringify({type: 'update', contextUpdate: ctx.update, userData: ctx?.userData}, null, 2) + ',\n', (err) => {
        if (err) {
            throw err
        }
    })
    return next()
}

