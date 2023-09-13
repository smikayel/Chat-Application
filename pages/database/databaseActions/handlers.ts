import fs from "fs-extra";
import { DatabaseI } from "./model.types";

class Database {
  dataFilePath: string;

  constructor() {
    this.dataFilePath = "pages/database/data.json";
  }

  async getAllData(): Promise<DatabaseI> {
    const rawData = await fs.readFile(this.dataFilePath, "utf-8");
    const data = JSON.parse(rawData);

    return data;
  }

  async saveData(data: DatabaseI) {
    await fs.writeFile(
      this.dataFilePath,
      JSON.stringify(data, null, 2),
      "utf-8"
    );
  }
}

const DBConnection = new Database();
export default DBConnection;
