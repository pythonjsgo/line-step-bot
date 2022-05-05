import dbManager from "@/db-manager";
import {bot} from '@/main'
import {Language} from "@/types";
import {createRawApi} from "grammy/out/core/client";

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



