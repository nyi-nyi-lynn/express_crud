import express, {} from "express";
import itemRoutes from "./routes/item.routes";
import { AppError } from "./services/item.service";
const app = express();
app.use(express.json());
app.get("/", (_req, res) => {
    res.json({ message: "Item CRUD API is running" });
});
app.use("/api/items", itemRoutes);
// Error-handling middleware must be registered last.
app.use((error, _req, res, _next) => {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            message: error.message,
        });
        return;
    }
    console.error(error);
    res.status(500).json({
        message: "Internal server error",
    });
});
export default app;
//# sourceMappingURL=app.js.map