import BaseModel from "./Main/BaseModels";
import pool from "../utils/db"; 

class PaslonModel extends BaseModel {
    protected tableName: string = "calon";
    protected primaryKey: string = "id";

    public async vote(id: number) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();


            const [rows] = await connection.query(`SELECT total FROM ${this.tableName} WHERE ${this.primaryKey} = ?`, [id]);
            const countBefore = rows[0].total;

            await connection.query(`UPDATE ${this.tableName} SET total = ? WHERE ${this.primaryKey} = ?`, [countBefore + 1, id]);

            await connection.commit(); 
            return { success: true };
        } catch (err) {
            await connection.rollback(); 
            return { success: false, error: err.message }; 
        } finally {
            connection.release(); 
        }
    }
}

export default PaslonModel;



