export interface Recipes {
    id: number
    name: string
    ingredients: any
    instructions: any
    prepTimeMinutes: number
    cookTimeMinutes: number
    servings: number
    difficulty: string
    cuisine: string
    caloriesPerServing: number
    tags: any
    image: string
    rating: number
    reviewCount: number
    mealType: any
}

export interface RecipesResponse {
    recipes: Recipes[]
    total: number
    skip: number
    limit: number
}
