import * as AWS from "@aws-sdk/client-dynamodb";

export const client = new AWS.DynamoDB({
  region: "",
});
