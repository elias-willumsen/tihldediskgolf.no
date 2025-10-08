declare module "*.css";

// For senere
declare namespace NodeJS {
  interface ProcessEnv {
    PUBLIC_API_BASE_URL: string;
    PUBLIC_SOCKET_URL?: string;
    API_KEY?: string;
  }
}

interface Window {
  __SOCKET_CONNECTED__?: boolean;
}
