import errorMiddleware from "./middlewares/error.middleware.ts";
import cors from "cors";
import helmet from "helmet";
import Routes from "./interfaces/route.interface";
import swaggerIgnite from "./swagger/swaggerIgnite";
import express from "express";
const bodyParser = require("body-parser");
import "express-async-errors";

class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initSwaggerDocs();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  public initSwaggerDocs() {
    swaggerIgnite(this.app);
  }

  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    this.app.use(bodyParser.json());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
