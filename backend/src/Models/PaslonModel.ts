import BaseModel from "./Main/BaseModels";
import pool from "../utils/db"; 
import { OkPacket, RowDataPacket } from 'mysql2';

class PaslonModel extends BaseModel {
    protected tableName: string = "calon";
    protected primaryKey: string = "id";

    public async vote(id: number): Promise<{ success: boolean; error?: string }> {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const [rows] = await connection.query<RowDataPacket[]>(
                `SELECT total FROM ${this.tableName} WHERE ${this.primaryKey} = ?`,
                [id]
            );

            if (rows.length === 0) {
                throw new Error('No entry found for the given ID');
            }

            const countBefore = rows[0].total;
            await connection.query<OkPacket>(
                `UPDATE ${this.tableName} SET total = ? WHERE ${this.primaryKey} = ?`,
                [countBefore + 1, id]
            );

            await connection.commit(); 
            return { success: true };
        } catch (err: any) {
            await connection.rollback(); 
            return { success: false, error: err.message }; 
        } finally {
            connection.release(); 
        }
    }

}
export default PaslonModel;
