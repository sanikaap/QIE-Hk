/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HF_API_KEY?: string;
  readonly VITE_HF_MODEL?: string;
  readonly VITE_OR_API_KEY?: string;
  readonly VITE_OR_MODEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
