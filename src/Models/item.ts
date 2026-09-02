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

export interface UpdateItemInput{
    name?: string;
    quantity?: string | number;
    purchased?: boolean;
}

function validateCreateInput(body: any): body is CreateItemInput{
    if (!body || typeof body !== "object"){
        return false;
    }

    if (typeof body.name !== "string" || body.name.trim() === ""){
        return false;
    }

    if (typeof body.quantity !== "string" && typeof body.quantity !== "number"){
        return false;
    }
    
    return true;
}

function valideUpdateInput(body: any): body is UpdateItemInput{
    if (!body || typeof body !== "object"){
        return false;
    }

    if (body.name !== undefined && (typeof body.name !== "string" || body.name.trim() === "")){
        return false;
    }

    if (body.quantity !== undefined && typeof body.quantity !== "string" && typeof body.quantity !== "number"){
        return false;
    }

    if (body.purchased !== undefined && typeof body.purchased !== "boolean"){
        return false;
    }

    return true;

}