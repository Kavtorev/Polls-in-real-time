const { NODE_ENV = "development" } = process.env;

const IN_PROD = NODE_ENV === "production";

let baseUrl: string;
if (!IN_PROD) {
  baseUrl = "http://localhost:3000/";
} else {
  // TODO configure domain ....
}

export { baseUrl, IN_PROD };
