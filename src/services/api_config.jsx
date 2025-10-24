export const api_config = {
  API_BASE_URL: import.meta.env.VITE_EXTRANET_URL,
  API_SOCKET_TRACCAR: import.meta.env.VITE_WS_TRACCAR_URL,
  PREFIX: "api",
  AUTH: {
    username: "admin",
    password: "admin",
  },
  AUTH_TRACCAR: {
    username: "reyesvrc@gmail.com",
    password: "admin",
  },
  HEADERS: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "	GET, POST, PUT, DELETE, OPTIONS",
    Authorization: "Basic " + btoa("admin:admin"),
    "Cache-Control": "private",
    "Content-Type": "application/json; charset=utf-8",
  },
  HEADERS_TRACCAR: {
    "Content-Type": "application/x-www-form-urlencoded",
    accept: "application/json",
  },
};
