import cookieParser from "cookie-parser";
import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import errorHandlerMiddleware from "./global/middleware/errorHandler";
import notFound from "./global/middleware/notFound";
import { SetupRoutes } from "./Routes";
import { config } from "dotenv";
import cluster, { Cluster } from "cluster";
import { trpcCors } from "./global/utils/corsOption";
config();

export class App {
  private static app: Application = express();
  private static server: any;
  private static cluster: Cluster = cluster;

  private static async init() {
    try {
      this.setupMiddlewares();
      this.setupHealthCheck();
      SetupRoutes.init(this.app);
      this.setupErrorHandling();
    } catch (error) {
      console.error("Error initializing the app:", error);
    }
  }

  private static setupMiddlewares() {
    this.app.use(trpcCors);
    this.app.use("*", (req, res, next) => {
      res.set('Access-Control-Allow-Origin', '*');
      next();
    })

    this.app.use(express.json());
    this.app.use(cookieParser(process.env.JWT_SECRET || ""));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());

    this.app.set("trust proxy", 1);
    this.app.get("/favicon.ico", (_req, res) => res.status(204).end());
  }


  private static setupHealthCheck() {
    this.app.get("/", (_req, res) => res.sendStatus(200));
  }

  private static setupErrorHandling() {
    this.app.use(errorHandlerMiddleware);
    this.app.use(notFound);
  }

  private static async startWorker() {
    const numCPUs = 1; // os.cpus().length
    console.info(`Master process started. Forking for ${numCPUs} CPUs...`);
    for (let i = 0; i < numCPUs; i++) {
      this.cluster.fork();
    }
    this.cluster.on("exit", (worker, code, signal) => {
      if (signal) {
        console.info(`Worker ${worker.process.pid} was killed by signal: ${signal}`);
      } else if (code !== 0) {
        console.error(`Worker ${worker.process.pid} exited with code: ${code}`);
      }
      console.info(`Restarting worker...`);
      this.cluster.fork();
    });
  }

  private static async startServer() {
    try {
      const port = Number(process.env.PORT || 3005);
      this.server = this.app.listen(port, () => {
        console.info(`Worker ${this.cluster.worker?.process.pid} listening on port ${port}`);
      });
    } catch (err: any) {
      console.error(`Worker failed to start: ${err.message}`);
      process.exit(1);
    }
  }

  public static async start() {
    if (this.cluster.isPrimary) {
      await this.startWorker();
    } else {
      await this.init();
      await this.startServer();
    }
  }
}