declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Site config
      NEXT_PUBLIC_BLOCK_EXPLORER: string;
      // Services
      NEXT_PUBLIC_ALCHEMY_ID: string;
    }
  }
}

export {};
