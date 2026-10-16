import { pool } from "../config/database";
export const ItemModel = {
    async findAll() {
        const result = await pool.query(`SELECT * FROM items ORDER BY id ASC`);
        return result.rows;
    },
    async findById(id) {
        const result = await pool.query(`SELECT * FROM items WHERE id = $1`, [
            id,
        ]);
        return result.rows[0] || null;
    },
    async create(data) {
        const result = await pool.query(`INSERT INTO items (name, description, price, quantity)
       VALUES ($1, $2, $3, $4)
       RETURNING *`, [data.name, data.description, data.price, data.quantity]);
        const item = result.rows[0];
        if (!item) {
            throw new Error("Failed to create item ");
        }
        return item;
    },
    async update(id, data) {
        const result = await pool.query(`UPDATE items 
        SET name = $1,
            description = $2,
            price = $3,
            quantity = $4,
            updated_at = NOW()
            WHERE  id=$5
            RETURNING *`, [data.name, data.description, data.price, data.quantity, id]);
        return result.rows[0] || null;
    },
    async delete(id) {
        let con = true;
        const result = await pool.query(`DELETE FROM items WHERE id = $1 RETURNING id`, [id]);
        if (!result.rowCount) {
            con = !con;
        }
        return con;
    },
};
//# sourceMappingURL=item.model.js.map