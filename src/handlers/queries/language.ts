import {Language} from "../../types";
import {setLanguage} from "../../db-manager";

export default async (ctx: any, next: any) => {
    const userID = ctx.from.id
    const data = <Language>ctx.callbackQuery.data
    setLanguage(userID, data)
        .then(() => {
            ctx.editMessageText('Язык успшено выбран')
        })
        .catch((err) => {
            ctx.editMessageText('При выборе языка произошла ошибка ' + err)
        })
}