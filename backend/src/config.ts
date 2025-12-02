import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: parseInt(process.env.PORT || '8080', 10),
  JWT_SECRET:
    process.env.JWT_SECRET || 'default-jwt-secret-key-change-in-production',
  ENCRYPTION_KEY:
    process.env.ENCRYPTION_KEY || 'default-encryption-key-change-in-production',
  SUPABASE_APIKEY: process.env.SUPABASE_APIKEY || '',
  DATABASE_URL: process.env.DATABASE_URL || '',
};

export default config;
