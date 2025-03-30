import express, { NextFunction, Request, Response, Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";

class App {
  public express: express.Application;
  private router: Router;

  constructor(routes: Router) {
    this.express = express();
    this.router = routes;  // Armazena o roteador recebido no construtor
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(bodyParser.json());
    this.express.use(cors({
      origin: '*',  // URL do frontend
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    }));


  }

  private routes(): void {
    // Rota de usuários
    this.express.use(routes);

    // Rota de saúde
    const healthy = (req: Request, res: Response) => {
      res.status(200).json({ chave: "OK" });
    };

    // Definindo a rota de saúde
    this.express.get("/health", healthy);
  }

  start(PORT: number): void {
    this.express.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  }
}

export default App;
