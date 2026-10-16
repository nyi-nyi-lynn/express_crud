import type { Request, Response, NextFunction } from "express";
export declare const createItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getItems: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getItemById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=item.controller.d.ts.map