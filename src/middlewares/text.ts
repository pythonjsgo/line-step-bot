import {handleReferral} from "../logic";

export default (ctx: any, next: any) => {
    const userID = ctx.from.id
    const text = ctx.msg.text
    if (text.split(' ').length > 1) {
        const query = text.split(' ')[1]
        if (query[0] === 'r') {
            const referralID = Number(query.slice(1))
            handleReferral(userID, referralID)
        }
    }
    next()
}
