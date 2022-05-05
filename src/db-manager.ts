import {MongoClient} from 'mongodb'
import * as config from '../config'
import {Language, UserID} from "./types";
import {createClient} from "redis";
import {readUserData} from "./middlewares/db";

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
    redis.set(`${config.DB_NAME}-${userID}-language`, language)
    return await db.users.updateOne({userID}, {$setOnInsert: {language: language}}, {upsert: true})
}
export async function getLanguage(userID: number){
    let cache = redis.get(`${config.DB_NAME}-${userID}-language`)
    if (cache) return cache

    const db = await dbManager
    let language: string = (await db.users.findOne({userID}))?.language
    redis.set(`${config.DB_NAME}-${userID}-language`, language)
    return language
}

export async function getUserData(userID: UserID) {

}