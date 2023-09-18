import { Server } from 'http';
import app from './app';
import config from './config';
import { errorlogger, logger } from './shared/logger';
import { JobPostService } from './app/module/job/job.services';

// bootstrap function
async function bootstrap() {
  const server: Server = app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    errorlogger.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });

  await JobPostService.deleteExpiredJobPosts();
}

bootstrap();
