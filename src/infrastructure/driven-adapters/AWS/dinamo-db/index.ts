import { config } from "../../../../config";
import AWS from "../aws";

export class DynamoDB {
  static TABLE_NAME = config.db.tableName || "";
  private static _INSTANCE: AWS.DynamoDB;

  static getInstance(options?: AWS.DynamoDB.ClientConfiguration): AWS.DynamoDB {
    if (this._INSTANCE === undefined) {
      this._INSTANCE = new AWS.DynamoDB(options);
    }

    return this._INSTANCE;
  }
}
