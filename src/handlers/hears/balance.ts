import dbManager from "@/db-manager";


export default async (ctx: any) => {
    const db = await dbManager
    let userData = db.users.findOne({userID: ctx?.from?.id})
    await ctx.reply(`${userData}`)
}