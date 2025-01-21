import { Recipes, RecipesResponse } from '@/src/types/Recipes'
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 5000,
})

export const fetchRecipes = async (
    page: number,
    limit: number = 12
): Promise<RecipesResponse> => {
    try {
        const response = await api.get<RecipesResponse>(`/recipes`, {
            params: {
                limit: limit,
                skip: (page - 1) * limit,
            },
        })
        return response.data // Đây là kiểu RecipesResponse
    } catch (error) {
        console.error('Error fetching recipes:', error)
        throw error
    }
}
