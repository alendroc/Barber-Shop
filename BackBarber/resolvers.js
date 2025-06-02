import { GraphQLError } from "graphql";
import { getUsuario, getUsuarios, crearUsuario } from "./services/usuario.js"
import { getBarbero, getBarberos } from "./services/barbero.js";
import { getCita, getCitas } from "./services/cita.js";
import { encryptPassword } from "./utils/encrypt.js";


export const resolvers = {
    Query: {
        usuario: (_root, { id }) => {
            const usuario = getUsuario(id)
            if (!usuario) {
                throw new GraphQLError('Usuario no existe', {
                    extensions: {
                        code: 'NOT_FOUND'
                    }
                })
            }
            return usuario
        },
        usuarios: (_root, { limit }) => {
            const items = getUsuarios(limit)
            return { items }
        },
        barbero: (_root, { id }) => {
            const barbero = getBarbero(id)
            if (!barbero) {
                throw new GraphQLError('Barbero no existe', {
                    extensions: {
                        code: 'NOT_FOUND'
                    }
                })
            }
            return barbero
        },
        barberos: (_root, { limit }) => {
            const items = getBarberos(limit)
            return { items }
        },
        cita: (_root, { id }) => {
            const cita = getCita(id)
            if (!cita) {
                throw new GraphQLError('Cita no existe', {
                    extensions: {
                        code: 'NOT_FOUND'
                    }
                })
            }
            return cita
        },
        citas: (_root, { limit }) => {
            const items = getCitas(limit)
            return { items }
        },
    },
    Usuario: {

    },
    Barbero: {

    },
    Cita: {

    },
    /*Task:{
        user:async (task)=>{
            return await getUser(task.user_id);
        },
        created_at:(task)=>{
            return task.created_at.slice(0,'yyyy-mm-dd'.length);
        }
    },*/

    Mutation: {
        /*createTask:async (_root,{input:{name,deadline}},{auth})=>{
            if(!auth){
                throw new GraphQLError("Usuario no autorizado",{extensions:{code:'UNAUTHORIZED'}})
            }
            const task=await createTask({name,deadline,user_id:auth.sub})
            pubSub.publish('TASK_ADDED',{newTask:task})
            return task
        },*/
        crearUsuario: async (_root, { input: { nombre, apellido, correo, telefono, rol, password } }) => {
            try {
                const hashedPassword = await encryptPassword(password);
                const usuario = await crearUsuario({ nombre, apellido, correo, telefono, rol, password: hashedPassword })

                return usuario
            } catch (error) {
                throw new GraphQLError('Error al crear el usuario', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                        details: error.message,
                    },
                });
            }
        },
    },
};