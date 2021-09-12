import { NestFactory } from '@nestjs/core';
import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import * as serverless from 'serverless-http';
import { AppModule } from '@web';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  return serverless(app.getHttpAdapter().getInstance());
}

let nestjsHandler: serverless.Handler;
export const handler: APIGatewayProxyHandler = async(event, context) => {
  nestjsHandler ??= (await bootstrap());
  return (await nestjsHandler(event, context)) as APIGatewayProxyResult;
};

export const helloWorld: APIGatewayProxyHandler = async (
  event,
  _context,
  callback
) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message:
          'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
