/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
