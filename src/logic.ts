import dbManager from "./db-manager";
import {bot} from "./main"
import {Language, UserID} from "./types.d";
import {createRawApi} from "grammy/out/core/client";
import {BONUS_PER_ONE_REFERRAL} from "../config";

export function spamProcess(message: any, language: string) {
    return new Promise(async resolve => {
        const db = await dbManager

        let users = await db.users.find({language}).toArray()
        for (const user of users){
            bot.api.copyMessage(user?.userID, message?.from?.id, message?.message_id)
        }

        }
    )
}

export async function handleReferral(userID: UserID, referralID: UserID){
    const db = await dbManager
    db.users.updateOne(userID, {$addToSet: {referrals: referralID}})
    db.users.updateOne(userID, {$inc: {
        balance: BONUS_PER_ONE_REFERRAL, profit: BONUS_PER_ONE_REFERRAL
    }})
    bot.api.sendMessage(referralID, 'Зачислен бонус за нового реферала!')
    return null

}



