import { registerAs } from '@nestjs/config';
import { ENV } from 'src/interfaces/env.interface';
export const ENV_VARIABLES = process.env as any as ENV;

export default registerAs('db', () => ({
  url: `mongodb://${ENV_VARIABLES.MONGO_USERNAME}:${ENV_VARIABLES.MONGO_PASSWORD}@${ENV_VARIABLES.MONGO_HOST}/${ENV_VARIABLES.MONGO_DB}?authSource=admin`,
}));
