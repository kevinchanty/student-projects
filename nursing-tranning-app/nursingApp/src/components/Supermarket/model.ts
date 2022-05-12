export type PurchaseList = {
    item: string,
    glycemic_index: number
}

export type Users = {
    username: string
    score: number
    glycemic_index: number
    user_id?: number
}

export type PurchasedItems = {
    user_id?: number
    item_id?: number
    purchase_at?: Date
}

export type StockItems = {
    item_id?: number
    glycemic_index: number
    item_name: string
    price: number
    is_gym?: boolean
    is_supermarket?: boolean
    info_about: string
    item_pic?: string
}