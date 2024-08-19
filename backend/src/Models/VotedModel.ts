import BaseModel from "./Main/BaseModels";

class VotedModel extends BaseModel {
    protected tableName: string = "voted";
    protected primaryKey: string = "id";
    public async insert(data: { user_id: number, paslon_id: number }): Promise<any> {
        try {
            const query = `INSERT INTO ${this.tableName} (user_id, paslon_id) VALUES (?, ?)`;
            const values = [data.user_id, data.paslon_id];

            const [result] = await this.client.query(query, values);
            return result;
        } catch (err) {
            console.error("Error inserting into voted table:", err);
            throw err;
        }
    }
}

export default VotedModel;
