import Fastify from 'fastify';
import { connectDB } from './src/config/connect.js';
import 'dotenv/config'; 
import { PORT } from "./src/config/config.js";
import { admin, buildAdminRouter } from './src/config/setup.js';

const start = async () => {
  await connectDB(process.env.MONGO_URI);

  const app = Fastify();

  // Custom authentication middleware can go here

 await buildAdminRouter(app);

  app.listen({ port: PORT, host: '0.0.0.0' }, (err, addr) => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      console.log(`Blinkit Started on http://localhost:${PORT}${admin.options.rootPath}`);
    }
  });
};

start();
