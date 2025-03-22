import express,{ Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";


class App {
  public express: express.Application;

  constructor(
    routes: express.Router
  ) {
    this.express = express();
    this.routes = routes;
    this.middlewares();
  }


  private middlewares(): void {
    this.express.use(bodyParser.json());
    this.express.use(cors());
  }

  routes(): void {
    this.express.use(this.routes);
    const healthy = (req: Request, res: Response) => {
      res.status(200).json("OK");
    };
    this.express.get("/health", healthy
    );
  }

  start(PORT: number): void {
    this.express.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  }

}

export default App;