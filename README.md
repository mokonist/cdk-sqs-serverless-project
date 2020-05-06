# cdk-sqs-serverless-project

[AWS CDKでAPIGateway/SQSと連携した2層LambdaをTypeScriptで開発してみる](https://dev.classmethod.jp/articles/aws-cdk-serverless-develop/)

## Project Tree

```
.
├── README.md
├── bin
│   └── cdk-event.ts
├── lambda # Lambdaは関数ごとにディレクトリを変えて保存、関数ごとにpackage.jsonを保持
│   ├── backend
│   │   ├── index.ts
│   │   ├── package-lock.json
│   │   └── package.json
│   └── front
│       ├── index.ts
│       ├── package-lock.json
│       └── package.json
├── lib
│   └── cdk-event-stack.ts # CDKのメイン部分
├── package-lock.json
├── package.json
├── cdk.json
└── tsconfig.json
```
