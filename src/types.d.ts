export type Language = 'ru' | 'en'
export type UserID = AllGreaterThan<0>
export interface UserData {
    userID: UserID,
    referrerID: UserID,
    name: string,
    balance: number,
    profit: number,
    referrals: Array<UserID>
}