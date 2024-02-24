export type ApiResponse = {
    resp?: {
        code: number
        data?: any
        message: string
    };
    isLoaded: boolean
    error?: Error
};

export type Room = {
    id: number
    floor: number | null
    size: number | null
    price: number
    boarding_houses: number
    rating_score: string
    status: number
    description: string
    created_date: Date | null
    image: string
}

export type User = {
    uid: string
    display_name?: string
    register_type: string
    photo?: string
    email?: string
    phone?: string
}

export type Message = {
    uid: string
    avatar: string
    name: string
    message: string
    created_at?: any
}

export type UserMessage = {
    uid: string
    avatar: string
    messages: Message[]
    name: string
}