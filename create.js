import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamo-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
  // request body is passed in as a json encoded string in event.body
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}