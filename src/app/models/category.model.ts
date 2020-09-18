export interface Category {
    _id: String,
    name: String,    
    parent: Category | String,
    createdAt: Date,
    updatedAt: Date,
    active: boolean
}