// types/product.ts
export interface Product {
    id: number;
    title: string;
    price: number;
    description?: string;
    image: string;
    shippingPolicy?: string;
    returnPolicy?: string;
}

export interface CartItem extends Product {
    quantity: number;
}
