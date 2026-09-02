export interface ShoppingItem{
    id: string;
    name: string;
    quantity: string | number;
    purchased: boolean;
    createdAt: string
}

export interface CreateItemInput{
    name: string;
    quantity: string | number;
}