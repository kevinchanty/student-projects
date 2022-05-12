export type EquipmentList = {
    equipment: string,
    glycemic_index: number
}

export type Users ={
    user_id?: number
    username: string
    score: number
    glycemic_index: number
}

export type PurchasedItems = {
    user_id?: number
    item_id?: number
    glycemic_index: number
    item_name: string
    price: number
    is_gym: boolean
    purchase_at?: number
}

export type StockItems = {
    item_id?: number
    glycemic_index: number
    item_name: string
    price: number
    is_gym: boolean
}