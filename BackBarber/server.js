import { ApolloServer } from "@apollo/server";
import { expressMiddleware as middleware } from "@apollo/server/express4";
import express from 'express';
import cors from 'cors';
import { resolvers } from './resolvers.js';
import { createServer as createHttpServer } from 'node:http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFile } from "node:fs/promises";
import { authMiddleware, getToken } from "./auth.js";
import path from "path";
import imageRoutes from './services/imagen.js'


const PORT = 9001;
const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post('/login', getToken);

const typeDefs = await readFile('./schema.graphql', 'utf8');

const graphSchema = makeExecutableSchema({ typeDefs, resolvers });

const graphServer = new ApolloServer({ schema: graphSchema });
await graphServer.start();

const httpServer = createHttpServer(app);

async function getContext({ req }) {
    return { auth: req.auth };
}

app.use('/graphql', middleware(graphServer, { context: getContext }));

app.use('/imagenes', express.static(path.join(process.cwd(), 'imagenes')));

app.use('/', imageRoutes);


httpServer.listen({ port: PORT }, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}/graphql`);
});
