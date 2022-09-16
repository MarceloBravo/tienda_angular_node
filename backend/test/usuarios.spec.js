import supertest from "supertest";
import app from '../src/index.js'
import { UsuarioModel } from '../models/UsuarioModel.js'
import { RolesModel } from '../models/RolModel.js'
import { rolesData, usuariosData, credentials, rolTesting, usuarioTesting } from './helpers.js'

const api = supertest(app)
let token = ""

describe('Test para los endpoints de usuarios', ()=>{

    
    beforeAll(async ()=>{
        await UsuarioModel.destroy({truncate: true, cascade: true, restartIdentity: true})
        await RolesModel.destroy({truncate: true, cascade: true, restartIdentity: true})

        let rol1 = await RolesModel.create(rolesData[0])
        rol1.save()

        let rol2 = await RolesModel.create(rolesData[1])
        rol2.save()

        //Creando el rol y el usuario para loguearse durante las pruebas de testing
        let _rolTesing = await RolesModel.create(rolTesting)
        _rolTesing.save()

        const _usuarioTesting = await UsuarioModel.create(usuarioTesting)
        _usuarioTesting.save()

        //Logueandose para los testings
        const res = await api.post('/login')
        .send(credentials)
        token = res.body.access_token
    })


    beforeEach(async ()=>{
        await UsuarioModel.destroy({truncate: true, cascade: true, restartIdentity: true})        

        const usuario1 = await UsuarioModel.create(usuariosData[0])
        usuario1.save()

        const usuario2 = await UsuarioModel.create(usuariosData[1])
        usuario2.save()
    })


    it('Retorna la página 1 con el listado de usuario "GET /usuarios/pag/:pag"', async  ()=>{
        const res = await api        
        .get('/usuarios/pag/1')
        .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(200)
        expect(res.body.count).toEqual(usuariosData.length)
       const apellidos =res.body.rows.map(u => u.apellido1)
        expect(apellidos.includes(usuariosData[usuariosData.length-1].apellido1)).toEqual(true)
    })


    it('Retorna un usuario a partir del texto buscado "GET /usuarios/filtrar/:texto/:pag"', async ()=>{
        const res = await api        
        .get('/usuarios/filtrar/Carla/1')
        .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(200)
        expect(res.body.count).toEqual(1)
        expect(res.body.rows[0].apellido1).toEqual('Contreras')
    })


    it('Retorna un array de todos los usuarios activos "GET /usuarios/get/all"', async ()=>{
        const res = await api        
        .get('/usuarios/get/all')
        .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(200)
        expect(res.body.rows.length).toEqual(usuariosData.length)
    })


    it('Retorna un usuario a partir del id solicitado "GET /usuarios/:id"', async ()=>{
        const res = await api        
        .get('/usuarios/2')
        .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(200)
        expect(res.body.id).toEqual(2)
        expect(res.body.nombres).toEqual('Carla')
    })


    it('Agrega un usuario en la tabla usuarios "POST /usuarios"', async ()=>{
        const newUser = {
            rut: "99.999.999-9",
            nombres: "Perico",
            apellido1: "Pericles",
            apellido2: "Pereira",
            direccion: "7 Oriente 14 Norte, Calle ficticia, S/N",
            email: "perico@prueba.cl",
            password: "122334",
            fono: "+569 987654321",
            rolId: 1
        }

        const res = await api            
            .post('/usuarios')
            .auth(token, {type: 'bearer'})
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })


    it('Actualiza el usuario especificado por el id "PUT /usuarios/:id"', async ()=>{
        const user = usuariosData[1]
        user.nombres = "Marcelo"
        user.apellido1 = "Bravo"
        user.apellido2 = "Castillo"

        const res = await api            
            .put('/usuarios/2')
            .auth(token, {type: 'bearer'})
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })


    it('Elimina un usuario en la tabla de usuarios "DELETE /usuarios/:id"', async () => {
        const res = await api        
        .delete('/usuarios/1')
        .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(200)
        expect(res.body.mensaje).toEqual('El Usuario ha sido eliminado.')

        const res2 = await api        
        .delete('/usuarios/3')
        .auth(token, {type: 'bearer'})

        expect(res2.status).toEqual(200)
        expect(res2.body.mensaje).toEqual('El usuario no fue encontrado o no existe.')

    })


    it('Marca un registro como borrado "DELETE /usuarios/softDelete/:id"', async ()=>{
        const res = await api        
        .delete('/usuarios/softDelete/2')
        .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(200)
        expect(res.body.mensaje).toEqual('El usuario ha sido borrado exitosamente.')

        const res2 = await api        
        .delete('/usuarios/softDelete/2')
        .auth(token, {type: 'bearer'})
        
        expect(res2.status).toEqual(404)
        expect(res2.body.mensaje).toEqual('Imposible eliminar. El usuario no fue encontrado o no existe.')

    })

})