import { Context, SQSEvent, Callback } from 'aws-lambda';

export async function handler(event: SQSEvent, context: Context, callback: Callback) {
  try {
    for (const message of event.Records) {
      // キューの処理
      console.log(message);
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000); //適当な処理
      });
    }
    callback(null, 'success');
  } catch (e) {
    callback(e);
  }
}
