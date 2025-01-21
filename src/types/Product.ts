export default interface Product {
    id: number
    title: string
    description: string
    price: number
    thumbnail: string
    rating: number
    images: any
    brand: string
    sku: string
    weight: number
    returnPolicy: string
    stock: number
    tags: any
    category: string
    discountPercentage: number
    minimumOrderQuantity: number
    reviews: Review[]
}

export interface Review {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
}
