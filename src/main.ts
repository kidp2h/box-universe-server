import { SentryInterceptor } from "@/common/interceptors/sentry.interceptor";
import { LogChalk } from "@/utils";
import { NestFactory } from "@nestjs/core";
import * as Sentry from "@sentry/browser";
import * as bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import * as os from "os";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import cors from "cors";
async function bootstrap() {
  // LogChalk.info(`${process.env.DATABASE_URL}`);
  if (process.env.SERVER_PORT && process.env.DSN_SENTRY) {
    const app = await NestFactory.create(AppModule);
    const cpus = os.cpus().length;
    process.env.UV_THREADPOOL_SIZE = cpus.toString();
    app.useGlobalInterceptors(new SentryInterceptor());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.use(compression());
    app.enableCors();
    app.use(
      helmet({
        contentSecurityPolicy:
          process.env.NODE_ENV === "production" ? undefined : false,
        crossOriginEmbedderPolicy:
          process.env.NODE_ENV === "production" ? undefined : false,
      }),
    );
    bodyParser.urlencoded({ extended: false });
    app.use(bodyParser.json({ limit: "200mb" }));
    app.use(
      "/graphql",
      cors<cors.CorsRequest>({
        origin: "localhost",
        credentials: true,
      }),
    );
    app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

    app.use(bodyParser.text({ limit: "200mb" }));
    app.use(cookieParser());
    Sentry.init({
      dsn: `${process.env.DSN_SENTRY}`,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0, //  Capture 100% of the transactions
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: [process.env.BASE_URL!],
      // Session Replay
      replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
      replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });

    if (process.env.NODE_ENV === "development") {
      app.enableCors({
        origin: "*",
        credentials: true,
      });
    }
    await app.listen(process.env.SERVER_PORT || 8334);
  } else {
    console.log("\n");
    LogChalk.info(`${process.env.SERVER_PORT}`);
    LogChalk.info(`${process.env.DATABASE_URL}`);
    LogChalk.info(`${process.env.DSN_SENTRY}`);
    LogChalk.error("Environment invalid");
  }
}
bootstrap();
