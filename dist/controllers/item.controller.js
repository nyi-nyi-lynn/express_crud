import { ItemService } from "../services/item.service";
export const createItem = async (req, res, next) => {
    try {
        const data = req.body;
        const item = await ItemService.create(data);
        res.status(201).json({
            message: "Item created successfully",
            data: item,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getItems = async (_req, res, next) => {
    try {
        const items = await ItemService.getAll();
        res.status(200).json({
            count: items.length,
            data: items,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getItemById = async (req, res, next) => {
    try {
        const item = await ItemService.getById(Number(req.params.id));
        res.status(200).json({ data: item });
    }
    catch (error) {
        next(error);
    }
};
export const updateItem = async (req, res, next) => {
    try {
        const item = await ItemService.update(Number(req.params.id), req.body);
        res.status(200).json({
            message: "Item updated successfully",
            data: item,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteItem = async (req, res, next) => {
    try {
        await ItemService.delete(Number(req.params.id));
        res.status(200).json({
            message: "Item deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=item.controller.js.map