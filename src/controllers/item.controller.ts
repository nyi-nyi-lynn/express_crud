import type { Request, Response, NextFunction } from "express";
import { ItemService } from "../services/item.service";
import type { CreateItem } from "../models/item.model";

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = req.body as CreateItem;
    const item = await ItemService.create(data);

    res.status(201).json({
      message: "Item created successfully",
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

export const getItems = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const items = await ItemService.getAll();

    res.status(200).json({
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

export const getItemById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const item = await ItemService.getById(
      Number(req.params.id),
    );

    res.status(200).json({ data: item });
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const item = await ItemService.update(
      Number(req.params.id),
      req.body as CreateItem,
    );

    res.status(200).json({
      message: "Item updated successfully",
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await ItemService.delete(Number(req.params.id));

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};