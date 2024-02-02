export type ApiResponse = {
    resp?: {
        code: number;
        data?: any;
        message: string;
    };
    isLoaded: boolean;
    error?: Error;
};

export type Room = {
    id: number;
    floor: number | null;
    size: number | null;
    price: number;
    boarding_houses: number;
    rating_score: string; // Assuming rating_score is a string representing a numeric value
    status: number;
    description: string;
    created_date: Date | null; // Assuming created_date is a Date object or null
    image: string;
}