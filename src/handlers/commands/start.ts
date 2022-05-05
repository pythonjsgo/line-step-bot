import * as keyboards from "../../assets/keyboards";

export default async (ctx: any) => {
    ctx.reply(ctx.i18n.t('main-menu'), {
        reply_markup: {
            resize_keyboard: true,
            keyboard: keyboards.mainMenu(ctx.i18n.locale()).build()
        },


    })
}