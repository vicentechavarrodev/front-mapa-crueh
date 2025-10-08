

export const api_config = {
    API_BASE_URL : import.meta.env.VITE_BASE_URL ,
    PREFIX : 'api',
    AUTH: {
    username: "admin",
    password: "admin"
  },
  HEADERS : {
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods": "	GET, POST, PUT, DELETE, OPTIONS",
    'Authorization': 'Basic '+ btoa('admin:admin'),
    'Cache-Control': 'private',
    'Content-Type': 'application/json; charset=utf-8',
  }
}


