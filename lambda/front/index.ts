import { APIGatewayProxyEvent, APIGatewayEventRequestContext, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
const SQS = new AWS.SQS({ region: 'ap-northeast-1' });
const QueueUrl = process.env.QUEUE_URL || '';

export async function handler(
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> {
  try {
    const sendMessage = await SQS.sendMessage({ MessageBody: JSON.stringify(event.body), QueueUrl }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(sendMessage)
    };
  } catch (e) {
    console.log(e);
    return { statusCode: 502, body: JSON.stringify(e) };
  }
}
