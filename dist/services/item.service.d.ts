import { type Item, type CreateItem } from "../models/item.model";
export declare class AppError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string);
}
export declare const ItemService: {
    create(data: CreateItem): Promise<Item>;
    getAll(): Promise<Item[]>;
    getById(id: number): Promise<Item>;
    update(id: number, data: CreateItem): Promise<Item>;
    delete(id: number): Promise<void>;
};
//# sourceMappingURL=item.service.d.ts.map