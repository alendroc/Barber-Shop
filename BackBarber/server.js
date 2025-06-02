import { ApolloServer } from "@apollo/server";
import { expressMiddleware as middleware } from "@apollo/server/express4";
import express from 'express'
import cors from 'cors'
import { resolvers } from './resolvers.js'
import { createServer as createHttpServer } from 'node:http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { readFile } from "node:fs/promises"
import { authMiddleware, getToken, decodeToken } from "./auth.js"
import { useServer } from 'graphql-ws/use/ws'
import { WebSocketServer } from 'ws'

const PORT = 9001
const app = express()
app.use(cors(), express.json(), authMiddleware)

app.post('/login', getToken)

const typeDefs = await readFile('./schema.graphql', 'utf8')

const graphSchema = makeExecutableSchema({ typeDefs, resolvers });

const graphServer = new ApolloServer({ schema: graphSchema })
await graphServer.start()

const httpServer = createHttpServer(app)

async function getContext({ req }) {
    return { auth: req.auth }
}
/**Manejo del WebSocket */
async function getWsContext({ connectionParams }) {
    const accessToken = connectionParams?.accessToken
    if (accessToken) {
        const payload = await decodeToken(accessToken)
        return { user: payload }
    }
    return {}
}
const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' })
useServer({ schema: graphSchema, context: getWsContext }, wsServer)


app.use('/graphql', middleware(graphServer, { context: getContext }))

httpServer.listen({ port: PORT }, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}/graphql`)
})
/*
app.listen({port:PORT},()=>{
    console.log(`Servidor corriendo en: http://localhost:${port}/graphql`)
})*/
