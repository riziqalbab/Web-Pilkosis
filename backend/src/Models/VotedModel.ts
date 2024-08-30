import BaseModel from "./Main/BaseModels";
import { RowDataPacket, ResultSetHeader } from 'mysql2';

class VotedModel extends BaseModel {
    protected tableName: string = "voted";
    protected primaryKey: string = "id";

    public async insert(data: { user_id: number; voted_caksis?: number; voted_cawaksis?: number }): Promise<any> {
        try {
            // Menyusun kolom dan nilai untuk query INSERT
            const columns: string[] = ['user_id'];
            const values: any[] = [data.user_id];
            
            if (data.voted_caksis !== undefined) {
                columns.push('voted_caksis');
                values.push(data.voted_caksis);
            }

            if (data.voted_cawaksis !== undefined) {
                columns.push('voted_cawaksis');
                values.push(data.voted_cawaksis);
            }

            // Menyusun query INSERT
            const query = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`;
            const [result] = await this.client.query(query, values);
            return result;
        } catch (err) {
            console.error("Error inserting into voted table:", err);
            throw err;
        }
    }

    public async update(data: { voted_caksis?: number; voted_cawaksis?: number }, userId: number): Promise<any> {
        try {
            const updates: string[] = [];
            const values: any[] = [];

            if (data.voted_caksis !== undefined) {
                updates.push("voted_caksis = ?");
                values.push(data.voted_caksis);
            }

            if (data.voted_cawaksis !== undefined) {
                updates.push("voted_cawaksis = ?");
                values.push(data.voted_cawaksis);
            }

            if (updates.length === 0) {
                throw new Error("No valid fields to update");
            }

            const query = `UPDATE ${this.tableName} SET ${updates.join(", ")} WHERE user_id = ?`;
            values.push(userId);

            const [result] = await this.client.query(query, values);
            return result;
        } catch (err) {
            console.error("Error updating voted table:", err);
            throw err;
        }
    }
    public async getAllVotes(): Promise<RowDataPacket[]> {
        try {
            const query = `SELECT * FROM ${this.tableName}`;
            const [results] = await this.client.query(query);
            return results as RowDataPacket[];
        } catch (err) {
            console.error("Error fetching votes:", err);
            throw err;
        }
    }

    public async countVotes(): Promise<number> {
        try {
            const query = `SELECT COUNT(*) as count FROM ${this.tableName}`;
            const [results] = await this.client.query<RowDataPacket[]>(query);
            return (results[0] as any).count;
        } catch (err) {
            console.error("Error counting votes:", err);
            throw err;
        }
    }
}

export default VotedModel;
