import supertest from 'supertest'
import app, { server } from '../src/index.js'
import { UsuarioModel } from '../models/UsuarioModel.js'
import { RolesModel } from '../models/RolModel.js'
import { rolTesting, usuarioTesting, credentials } from './helpers.js'

const api = supertest(app)

describe('Test para la autenticación de usuarios', () => {
    
    beforeAll(async ()=>{
        await UsuarioModel.destroy({truncate: true, cascade: true, restartIdentity: true})
        await RolesModel.destroy({truncate: true, cascade: true, restartIdentity: true})

        const rol = await RolesModel.create(rolTesting)
        rol.save()

        const user = await UsuarioModel.create(usuarioTesting)
        user.save()
    }, 100000)  //Aumenta el tiempo de los tests, por defecto es 5000


    it('Autenticación de usuario "POST /login"', async ()=> {
        
        const res = await api.post('/login')
            .send(credentials)

            expect(res.status).toEqual(200)            
            expect(res.body).toHaveProperty('access_token')
            expect(res.body).toHaveProperty('refresh_token')
            expect(res.body.access_token).not.toBeNull()
            expect(res.body.refresh_token).not.toBeNull()
    })


    it('Cierre de session "POST /logout"', async ()=>{
        const loginRes = await api.post('/login')
            .send(credentials)
            .expect(200)
            expect(loginRes.body).toHaveProperty('access_token')

        const token = loginRes.body.access_token

        const res2 = await api.post('/logout')
            .auth('abcde', {type: 'bearer'})
            .expect(401)

        const res = await api.post('/logout')
            .auth(token, {type: 'bearer'})
            .expect(200)
            expect(res.body.mensaje).toEqual('La sesión ha sido finalizada correctamente.')

    })


    it('Extender sessión "POST /refreshtoken"', async ()=>{
        //Loguendose por primera vez
        const loginRes = await api.post('/login')
            .send(credentials)
            .expect(200)
            expect(loginRes.body).toHaveProperty('refresh_token')

        const refreshToken = loginRes.body.refresh_token

        //Extendiendo sessión y obteniendo nuevos tokens
        const res = await api.post('/refreshtoken')
            .send({refreshToken, host: '127.0.0.1'})
            .expect(200)

            expect(res.body).toHaveProperty('access_token')
            expect(res.body).toHaveProperty('refresh_token')
            expect(res.body.access_token).not.toBeNull()
            expect(res.body.refresh_token).not.toBeNull()

        //Extendiendo sessión con el token obtenido la primera vez que se efectuó el login
        const resFail = await api.post('/refreshtoken')
            .send({refreshToken: 'aesrsqe547egg.hcvsycynnwefuywb.trcw3crucfgsuh', host: '127.0.0.1'})
            .expect(500)

            expect(resFail.body).toHaveProperty('mensaje')
            expect(resFail.body.mensaje.includes('Ocurrió un error al volver a autenticar al usuario: ')).toEqual(true)
    })
})

