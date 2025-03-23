import awsServerlessExpress from "aws-serverless-express";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import App from "./src/app"; // Importa a classe App
import express, { Router } from "express";

// Cria uma instância do servidor Express
const appInstance = new App(Router());

// Cria o servidor Lambda usando o Express
const server = awsServerlessExpress.createServer(appInstance.express);

// Função handler do Lambda que será chamada pelo AWS
export const handler = (event: APIGatewayProxyEvent, context: Context) => {
  // Chama o servidor Express para processar a requisição
  awsServerlessExpress.proxy(server, event, context);
};
