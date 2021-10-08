import express, { Application } from "express";
import { routes } from "src/routes";

const app: Application = express();

const port = 5000;

app.use(express.json());

app.use(...routes)

app.listen(port, () => console.log(`listening on port: ${port}`));
