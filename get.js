import * as dynamoDbLib from "./libs/dynamo-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if(result.Item) {
      return success(result.Item);
    } else {
      console.log('result: ', result);
      return failure({ status: false, error: "Item not found" });
    }
  } catch (e) {
    return failure({ status: false });
  }
}