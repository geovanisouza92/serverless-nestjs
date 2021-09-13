import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import * as serverless from 'serverless-http';
import { AppModule } from '@web';

async function bootstrapExpress() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  return serverless(app.getHttpAdapter().getInstance(), {
    basePath: '/express',
  });
}

let expressHandler: serverless.Handler;
export const express: APIGatewayProxyHandler = async(event, context) => {
  expressHandler ??= (await bootstrapExpress());
  return (await expressHandler(event, context)) as APIGatewayProxyResult;
};

async function bootstrapFastify() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  await app.init();
  return serverless(app.getHttpAdapter().getInstance(), {
    basePath: '/fastify',
  });
}

let fastifyHandler: serverless.Handler;
export const fastify: APIGatewayProxyHandler = async(event, context) => {
  fastifyHandler ??= (await bootstrapFastify());
  return (await fastifyHandler(event, context)) as APIGatewayProxyResult;
};
