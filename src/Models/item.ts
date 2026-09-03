export interface ShoppingItem {
    id: string;
    name: string;
    quantity: string | number;
    purchased: boolean;
    createdAt: string;
}

export interface CreateItemInput {
    name: string;
    quantity: string | number;
}

export interface UpdateItemInput {
    name?: string;
    quantity?: string | number;
    purchased?: boolean;
}

function isValidQuantity(q: unknown): boolean {
    return typeof q === "number" || (typeof q === "string" && q.trim().length > 0);
}

export function validateCreateInput(body: unknown): body is CreateItemInput {
    if (typeof body !== "object" || body === null) return false;
    
    const { name, quantity } = body as Record<string, unknown>;
    
    return typeof name === "string" && name.trim().length > 0 && isValidQuantity(quantity);
}

export function validateUpdateInput(body: unknown): body is UpdateItemInput {
    if (typeof body !== "object" || body === null) return false;
    
    const entries = Object.entries(body as Record<string, unknown>);
    if (entries.length === 0) return false;

    return entries.every(([key, value]) => {
        if (value === undefined) return true;
        
        switch (key) {
            case "name":
                return typeof value === "string" && value.trim().length > 0;
            case "quantity":
                return isValidQuantity(value);
            case "purchased":
                return typeof value === "boolean";
            default:
                return true;
        }
    });
}
