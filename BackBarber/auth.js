import { expressjwt } from "express-jwt"
import jwt from "jsonwebtoken"
import { getUsuarioByCorreo } from "./services/usuario.js"
import { comparePassword } from "./utils/encryption.js"

const secret = Buffer.from('fundamentosweb', 'base64')

export const authMiddleware = expressjwt({
    algorithms: ['HS256'],
    credentialsRequired: false,
    secret,
})

export async function getToken(req, res) {
    const { email, password } = req.body

    const user = await getUsuarioByCorreo(email)

    if (!user || !(await comparePassword(password, user.password))) {
        res.sendStatus(401)
    } else {
        const claims = {
            sub: user.id,
            email: user.correo,
            name: user.nombre,
            rol: user.rol
        }
        const token = jwt.sign(claims, secret)
        res.json({ user: claims, token })
    }
}

export async function decodeToken(token) {
    try {
        return jwt.verify(token, secret)
    } catch (err) {
        console.log("Error:", err)
        return null
    }
}