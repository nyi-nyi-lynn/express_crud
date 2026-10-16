import type { CreateReadStreamFSImplementation } from "node:fs";
import { pool } from "../config/database";

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

export const ItemModel = {
  async findAll(): Promise<Item[]> {
    const result = await pool.query<Item>(
      `SELECT * FROM items ORDER BY id ASC`,
    );
    return result.rows;
  },
  async findById(id: number): Promise<Item | null> {
    const result = await pool.query<Item>(`SELECT * FROM items WHERE id = $1`, [
      id,
    ]);
    return result.rows[0] || null;
  },
  async create(data: CreateItem): Promise<Item> {
    const result = await pool.query<Item>(
      `INSERT INTO items (name, description, price, quantity)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [data.name, data.description, data.price, data.quantity],
    );
    const item = result.rows[0];
    if (!item) {
      throw new Error("Failed to create item ");
    }
    return item;
  },
  async update(id: number, data: CreateItem): Promise<Item | null> {
    const result = await pool.query<Item>(
      `UPDATE items 
        SET name = $1,
            description = $2,
            price = $3,
            quantity = $4,
            updated_at = NOW()
            WHERE  id=$5
            RETURNING *`,
      [data.name, data.description, data.price, data.quantity, id],
    );
    return result.rows[0] || null;
  },
  async delete(id: number): Promise<boolean> {
    let con: boolean = true;
    const result = await pool.query(
      `DELETE FROM items WHERE id = $1 RETURNING id`,
      [id],
    );
    if (!result.rowCount) {
      con = !con;
    }
    return con;
  },
};
