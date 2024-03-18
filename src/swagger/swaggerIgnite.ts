import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Application } from "express";

function swaggerIgnite(applicationInstance: Application) {
  const { PORT, APP_PATH } = process.env;
  const swaggerDefinition = {
    info: {
      title: "Prueba Técnica Global Think Tecnology",
      version: "1.0.0",
    },
    host: APP_PATH + ":" + PORT,
    basePath: "/",
    schemes: ["http"],
  };

  const options = {
    swaggerDefinition,
    apis: ["./src/swagger/docs/**/*.yaml"],
  };
  const swaggerSpec = swaggerJSDoc(options);

  applicationInstance.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec),
  );
}

export default swaggerIgnite;
