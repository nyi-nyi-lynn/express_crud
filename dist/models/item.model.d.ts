export interface Item {
    id: number;
    name: string;
    description: string | null;
    price: string;
    quantity: number;
    created_at: Date;
    updated_at: Date;
}
export interface CreateItem {
    name: string;
    description: string | null;
    price: number;
    quantity: number;
}
export declare const ItemModel: {
    findAll(): Promise<Item[]>;
    findById(id: number): Promise<Item | null>;
    create(data: CreateItem): Promise<Item>;
    update(id: number, data: CreateItem): Promise<Item | null>;
    delete(id: number): Promise<boolean>;
};
//# sourceMappingURL=item.model.d.ts.map