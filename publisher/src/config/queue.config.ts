import { registerAs } from '@nestjs/config';

export default registerAs('notification', () => ({
  queue: {
    name: 'notification',
    redis:
      process.env.REDIS_USE_URL === 'false'
        ? {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT, 10) || 6379,
            username: process.env.REDIS_USERNAME || '',
            password: process.env.REDIS_PASSWORD || '',
          }
        : process.env.REDIS_URL || 'redis://redis:6379',
    limiter: {
      max: 100, // Max number of jobs processed
      duration: 1000 * 60 * 60 * 24, // per duration in milliseconds (in this case 1 day)
      bounceBack: false, // When jobs get rate limited, they stay in the waiting queue and are not moved to the delayed queue
    },
  },
}));
