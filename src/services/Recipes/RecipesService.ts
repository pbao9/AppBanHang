import Recipes from '@/src/types/Recipes'
import axios from 'axios'

interface RecipesResponse {
    recipes: Recipes[]
    total: number
    skip: number
    limit: number
}

const api = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 5000,
})

export const fetchRecipes = async (
    page: number,
    limit: number = 12
): Promise<Recipes[]> => {
    try {
        const response = await api.get<RecipesResponse>(`/recipes`, {
            params: {
                limit: limit,
                skip: (page - 1) * limit,
            },
        })
        return response.data.recipes
    } catch (error) {
        console.error('Error fetching recipes:', error)
        throw error
    }
}

// export const fetchProductsByCategory = async (
//     category: string
// ): Promise<Product[]> => {
//     try {
//         const response = await api.get<ProductResponse>(
//             `/products/category/${category}`,
//             {}
//         )
//         return response.data.products
//     } catch (error) {
//         console.error('Error fetching products by category:', error)
//         throw error
//     }
// }

// export const fetchProductById = async (id: number): Promise<Product> => {
//     try {
//         const response = await api.get<Product>(`/products/${id}`)
//         return response.data
//     } catch (err) {
//         console.error(`Error fetching product by ID (${id})`, err)
//         throw err
//     }
// }

// export const fetchProductCategoryList = async (): Promise<Category[]> => {
//     try {
//         const response = await api.get<Category[]>(`/products/categories`)
//         return response.data
//     } catch (error) {
//         console.error('Error fetching product category list:', error)
//         throw error
//     }
// }
