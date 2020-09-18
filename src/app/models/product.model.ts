export interface Product {
    _id: String,
    name: String,
    description: String,
    price: Number,
    discount: Number,
    size: Number,
    sides: Number,
    quantity: Number,
    extras: String,    
    media: String,    
    category: String,
    createdAt?: Date,
    updatedAt?: Date,
    active?: boolean
}