import dbManager from "../db-manager";

export const readUserData = async (ctx: any, next: any) => {
    const userID = ctx.from.id
    const db = await dbManager

    var userData: any = await db.users.findOne({userID: userID})
    if (!userData) {
        userData = {userID: userID, name: ctx.from.name}
        // @ts-ignore
        userData.step = 'choose-language'
        db.users.insertOne({...userData})
    } else {

    }
    ctx.userData = userData
    next()
}

export const writeUserData = async (ctx: any, next: any) => {
    const userID = ctx.from.id
    const db = await dbManager
    console.log(ctx.userData, 'writeUserData')
    db.users.replaceOne({userID: userID}, ctx.userData)
    //await users.updateOne({userID: userID}, ctx.userData)
}



/* Release only
export const readUserData = (ctx: any, next: any) => {
    ctx.userData = new Promise((async (resolve, reject) => {
        const userID: number = ctx.from.id
        const db = await dbManager()
        let userData = await db.users.findOne({userID: userID})
        if (!userData) {
            userData = values.DEFAULT_USER_DATA
            userData.userID = userID

            if (values.USER_IDS.includes(userID)){
                userData.role = 'user'
            }
            if (values.ADMIN_IDS.includes(userID)) {
                userData.role = 'admin'
            }
            if (userData.role){
                await db.users.insertOne(userData)
                userData._old = userData
                resolve(userData)
            } else {
                ctx.reply(`<b>Ваш аккаунт не найден в базе, обратитесь к администратору для добавления аккаунта!</b>\nВаш ID - <code>${userID}</code>`, {parse_mode: "HTML"})
            }

        } else {
            userData._old = userData
            resolve(userData)
        }
    }))
    next()
}
 */