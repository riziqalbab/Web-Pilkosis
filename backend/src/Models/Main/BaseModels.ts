// BaseModel.ts
import { QueryResult } from '@supabase/supabase-js';
import pool from '../../utils/db';  
import { FieldPacket, OkPacketParams } from 'mysql2';

class BaseModel {
    protected client = pool;  
    protected tableName: string = "siswa";
    protected primaryKey: string = "id";

    public HelloWorld() {
        console.log("hello world");
        return "Hello world";
    }

    public async All() {
        try {
            const [rows] = await this.client.query(`SELECT * FROM ${this.tableName}`);
            return rows;
        } catch (err) {
            return err;
        }
    }

    public async FindByID(id: number) {
        try {
            const [rows] = await this.client.query(`SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = ?`, [id]);
            return rows;
        } catch (err) {
            return err;
        }
    }

    public async Find(condition: { [key: string]: string }): Promise<any> {
        try {
            let query = `SELECT * FROM ${this.tableName} WHERE `;
            const values = [];
            let i = 0;
            for (const key in condition) {
                if (i > 0) {
                    query += " AND ";
                }
                query += `${key} = ?`;
                values.push(condition[key]);
                i++;
            }
    
            const [ rows ] = await this.client.query(query, values);
            return rows;
        } catch (err) {
            return err;
        }
    }

    public async insert(data: {[key: string] : string }) {
        try {
            let query = `INSERT INTO ${this.tableName} (`;
            let placeholders = "VALUES (";
            const values = [];
            let i = 0;

            for (const key in data) {
                if (i > 0) {
                    query += ", ";
                    placeholders += ", ";
                }
                query += key;
                placeholders += "?";
                values.push(data[key]);
                i++;
            }
            query += ") ";
            placeholders += ") ";
            query += placeholders;

            const [result] = await this.client.query(query, values);
            return result;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    public async dropById(id: number) {
        try {
            const [result] = await this.client.query(`DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = ?`, [id]);
            return result;
        } catch (err) {
            return err;
        }
    }

    public async drop(condition: {[key: string] : string}) {
        try {
            let query = `DELETE FROM ${this.tableName} WHERE `;
            const values = [];
            let i = 0;
            for (const key in condition) {
                if (i > 0) {
                    query += " AND ";
                }
                query += `${key} = ?`;
                values.push(condition[key]);
                i++;
            }

            const [result] = await this.client.query(query, values);
            return result;
        } catch (err) {
            return err;
        }
    }
    
}


export default BaseModel;
