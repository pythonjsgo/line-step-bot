import {MongoClient} from 'mongodb'
import * as config from '../config'
import {Language, UserID} from "@/types";
import {createClient} from "redis";

export const redis = createClient();
redis.on('error', (err) => console.log('Redis Client Error', err));
redis.connect()



let client = new MongoClient(config.MONGO_URI)

export const dbManager = (async () => {
    await client.connect();
    const db = client.db(config.DB_NAME)
    return {
        users: db.collection('users'),
        orders: db.collection('orders'),
        folders: db.collection('folders'),
        referralLinks: db.collection('referralLinks'),
        db
    }
})()

export default dbManager




export async function setUserStep(userID: number, step: string = '') {

    const db = await dbManager
    return db.users.updateOne({userID}, {$setOnInsert: {step}}, {upsert: true})
}


export async function setLanguage(userID: number, language: Language) {
    const db = await dbManager
    return await db.users.updateOne({userID}, {$setOnInsert: language}, {upsert: true})
}

export async function getUserData(userID: UserID) {

}