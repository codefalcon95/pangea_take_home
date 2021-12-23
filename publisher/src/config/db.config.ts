import { registerAs } from '@nestjs/config';
import { ENV } from 'src/interfaces/env.interface';
export const ENV_VARIABLES = process.env as any as ENV;

export default registerAs('db', () => ({
  uri: `mongodb://${ENV_VARIABLES.MONGO_USERNAME}:${ENV_VARIABLES.MONGO_PASSWORD}@${ENV_VARIABLES.MONGO_HOST}:27017/${ENV_VARIABLES.MONGO_DB}?authSource=admin`,
}));
