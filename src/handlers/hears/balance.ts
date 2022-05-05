import dbManager from "../../db-manager";
import * as config from "../../../config";


export default async (ctx: any, next: any) => {
    const db = await dbManager
    let userData = await db.users.findOne({userID: ctx?.from?.id})
    await ctx.reply(ctx.i18n.t('balance', {
        balance: userData?.balance || 0,
        profit: userData?.profit || 0,
        invited: userData?.referrals?.length || 0,
        minimumWithdrawalAmount: config.MINIMUM_WITHDRAWAL_AMOUNT
    }), {parse_mode: "HTML"})
}