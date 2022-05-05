import {getLanguage} from "../db-manager";
import * as keyboards from "../assets/keyboards";

export default async (ctx: any, next: any) => {
    let language = await getLanguage(<number>ctx?.from?.id)
    if (!language) {
        return ctx.reply('Выберете язык', {reply_markup: keyboards.chooseLanguage})
    }
    ctx.i18n.locale(language)
    next()
}