import axios from 'axios'

interface Product {
    id: number
    title: string
    description: string
    price: number
    thumbnail: string
    rating: number
}

interface ProductResponse {
    products: Product[]
    total: number
    skip: number
    limit: number
}

const api = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 5000,
})

export const fetchProducts = async (
    page: number,
    limit: number = 12
): Promise<Product[]> => {
    try {
        const response = await api.get<ProductResponse>(`/products`, {
            params: {
                limit: limit,
                skip: (page - 1) * limit,
            },
        })
        return response.data.products
    } catch (error) {
        console.error('Error fetching products:', error)
        throw error
    }
}

export const fetchProductsByCategory = async (
    category: string
): Promise<Product[]> => {
    try {
        const response = await api.get<ProductResponse>(
            `/products/category/${category}`,
            {}
        )
        return response.data.products
    } catch (error) {
        console.error('Error fetching products by category:', error)
        throw error
    }
}
