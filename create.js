import handler from "./libs/handler-lib";
import * as uuid from "uuid";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    // Request body is passed in as a JSON encoded string
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,

        // 'Item' contains the attributes of the item to be created in the table
        // - 'userId': user identities from the Cognito Identity Pool
        // - 'noteId': a unique uuid
        // - 'content': parsed from request body
        // - 'attachment': parsed from request body
        // - 'createdAt': current Unix timestamp

        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    await dynamoDb.put(params);

    return params.Item;
});