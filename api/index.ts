import serverlessHttp from "serverless-http";
import { createServer } from "../server/index";

const app = createServer();

// Export the handler for Vercel
export default serverlessHttp(app);
