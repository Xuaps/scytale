let appInsights = require('applicationinsights');
import config from "config";
appInsights.setup(config.get("Azure.ApplicationInsightKey")).start()

import express, { Request, Response, NextFunction } from "express";
import routes from "./src/api/infrastructure/routes";
import cors from "cors";
import path from "path";
import helmet from "helmet"

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(helmet())
app.use(cors());
app.use(function (req, res, next) {
  req.params
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

app.use("/api", routes);
app.use("/assets", express.static(path.join(__dirname, "src/web")));
app.use('*', express.static('public'))
app.use(
  (error: Error, req: Request, res: Response, next: NextFunction): Response => {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
