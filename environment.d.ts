declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Supabase
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      SUPABASE_SERVICE_KEY: string;
      // Services
      NEXT_PUBLIC_ALCHEMY_ID: string;
      TRANSPOSE_API_KEY: string;
    }
  }
}

export {};
