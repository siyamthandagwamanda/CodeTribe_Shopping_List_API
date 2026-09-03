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

function isValidQuantity(value: unknown) {
    return typeof value === "number" ||
        (typeof value === "string" && value.trim() !== "");
}

export function validateCreateInput(body: unknown): body is CreateItemInput {
    if (!body || typeof body !== "object") {
        return false;
    }

    const data = body as Record<string, unknown>;

    return (
        typeof data.name === "string" &&
        data.name.trim() !== "" &&
        isValidQuantity(data.quantity)
    );
}

export function validateUpdateInput(body: unknown): body is UpdateItemInput {
    if (!body || typeof body !== "object") {
        return false;
    }

    const data = body as Record<string, unknown>;
    const keys = Object.keys(data);

    if (keys.length === 0) {
        return false;
    }

    for (const key of keys) {
        const value = data[key];

        if (value === undefined) {
            continue;
        }

        if (key === "name" && (typeof value !== "string" || value.trim() === "")) {
            return false;
        }

        if (key === "quantity" && !isValidQuantity(value)) {
            return false;
        }

        if (key === "purchased" && typeof value !== "boolean") {
            return false;
        }
    }

    return true;
}
