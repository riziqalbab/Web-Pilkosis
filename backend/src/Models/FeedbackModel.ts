import BaseModel from "./Main/BaseModels";

class FeedbackModel extends BaseModel {
    protected tableName: string= "feedback";
    protected primaryKey: string= "id";

    public async insert(data: { nama: string, kritik: string, saran : string }): Promise<any> {
        try {
            const query = `INSERT INTO ${this.tableName} (nama, kritik, saran) VALUES (?, ?, ?)`;
            const values = [data.nama, data.kritik, data.saran];

            const [result] = await this.client.query(query, values);
            return result;
        } catch (err) {
            console.error("Error inserting into voted table:", err);
            throw err;
        }
    }
}

export default FeedbackModel;

