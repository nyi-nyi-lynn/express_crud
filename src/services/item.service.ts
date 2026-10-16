import {
  ItemModel,
  type Item,
  type CreateItem,
} from "../models/item.model";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

function validateItem(data: CreateItem): void {
  if (typeof data.name !== "string" || !data.name.trim()) {
    throw new AppError(400, "Item name is required");
  }

  if (
    typeof data.price !== "number" ||
    !Number.isFinite(data.price) ||
    data.price < 0
  ) {
    throw new AppError(400, "Price must be a non-negative number");
  }

  if (!Number.isInteger(data.quantity) || data.quantity < 0) {
    throw new AppError(400, "Quantity must be a non-negative integer");
  }

  if (data.description !== null && typeof data.description !== "string") {
    throw new AppError(400, "Description must be a string or null");
  }
}

export const ItemService = {
  async create(data: CreateItem): Promise<Item> {
    validateItem(data);

    return ItemModel.create({
      ...data,
      name: data.name.trim(),
    });
  },

  async getAll(): Promise<Item[]> {
    return ItemModel.findAll();
  },

  async getById(id: number): Promise<Item> {
    if (!Number.isSafeInteger(id) || id <= 0) {
      throw new AppError(400, "Invalid item ID");
    }

    const item = await ItemModel.findById(id);

    if (!item) {
      throw new AppError(404, "Item not found");
    }

    return item;
  },

  async update(id: number, data: CreateItem): Promise<Item> {
    if (!Number.isSafeInteger(id) || id <= 0) {
      throw new AppError(400, "Invalid item ID");
    }

    validateItem(data);

    const item = await ItemModel.update(id, {
      ...data,
      name: data.name.trim(),
    });

    if (!item) {
      throw new AppError(404, "Item not found");
    }

    return item;
  },

  async delete(id: number): Promise<void> {
    if (!Number.isSafeInteger(id) || id <= 0) {
      throw new AppError(400, "Invalid item ID");
    }

    const deleted = await ItemModel.delete(id);

    if (!deleted) {
      throw new AppError(404, "Item not found");
    }
  },
};
