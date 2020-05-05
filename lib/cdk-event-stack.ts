import { Stack, Construct, StackProps } from '@aws-cdk/core';
import { Queue } from '@aws-cdk/aws-sqs';
import { Runtime } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources';
import { LambdaRestApi } from '@aws-cdk/aws-apigateway';
import { PolicyStatement } from '@aws-cdk/aws-iam';

export class CdkEventStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // フロントのLambda
    const frontLambda = new NodejsFunction(this, 'FrontLambda', {
      entry: 'lambda/front/index.ts',
      handler: 'handler',
      runtime: Runtime.NODEJS_12_X
    });
    // REST API作成、Lambda指定
    const RestAPI = new LambdaRestApi(this, 'FrontAPI', {
      handler: frontLambda
    });

    // SQS作成
    const queue = new Queue(this, 'queue', {});
    // バックエンドのLambda
    const backendLambda = new NodejsFunction(this, 'BackendLambda', {
      entry: 'lambda/backend/index.ts',
      handler: 'handler',
      runtime: Runtime.NODEJS_12_X
    });
    // フロントのLambdaにSQSのURLを環境変数で渡す
    frontLambda.addEnvironment('QUEUE_URL', queue.queueUrl);
    // SQSポリシー追加
    frontLambda.addToRolePolicy(new PolicyStatement({ actions: ['sqs:SendMessage'], resources: [queue.queueArn] }));
    // SQSをイベントソースにLambdaを実行するよう設定
    const eventSource = backendLambda.addEventSource(new SqsEventSource(queue));
  }
}
