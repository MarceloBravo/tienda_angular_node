import supertest from 'supertest'
import app from '../src/index.js'
import { server } from '../src/index.js'
import { RolModel } from '../models/RolModel.js'
import { UsuarioModel } from '../models/UsuarioModel.js'
import { rolesData, credentials, usuarioTesting, rolTesting } from './helpers.js'

const api = supertest(app)
let token = ""

describe('Test para los endpoints de roles',  () => {

    beforeAll(async () => {
        await UsuarioModel.destroy({truncate: true, cascade: true, restartIdentity: true})
        await RolModel.destroy({truncate: true, cascade: true, restartIdentity: true})
        
        //Creando el rol y el usuario para loguearse durante las pruebas de testing
        const _rolTesting = await RolModel.create(rolTesting)
        _rolTesting.save()

        const _usuarioTesting = await UsuarioModel.create(usuarioTesting)
        _usuarioTesting.save()

        //Logueandose para los testings
        const res = await api.post('/login')
            .send(credentials)
        token = res.body.access_token
    })


    beforeEach(async ()=>{
        await RolModel.destroy({ truncate : true, cascade: true, restartIdentity: true })
        
        const _rol1 = await RolModel.create(rolesData[0])        
        _rol1.save()

        const _rol2 = await RolModel.create(rolesData[1])
        _rol2.save()        
    })

    
    it('Crea un rol "POST /roles"', async () => {
        const rol = {
            nombre: "Admin"
        }
        const res = await api            
            .post('/roles')
            .auth(token, {type: 'bearer'})
            .send(rol)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(res.body.data.descripcion).toEqual(rol.descripcion)

    })
    

    it('Actualiza un rol "PUT /roles/:id"', async () => {
        const res1 = await api        
        .get('/roles/1')
        .auth(token, {type: 'bearer'})
        
        expect(res1.body.nombre).toEqual('Rol test 1')

        let rol = res1.body
        rol.nombre = 'Invitado'
        
        const res2 = await api                
                .put('/roles/1')
                .auth(token, {type: 'bearer'})
                .send(rol)
                .expect(200)
                .expect('Content-Type', /application\/json/)

        expect(res2.body.data.nombre).toEqual(rol.nombre)
    })
    

    it('Retorna el listado de roles "GET /roles"', async () => {
        const res = await api        
        .get('/roles/pag/1')
        .auth(token, {type: 'bearer'})


        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body.count).toEqual(rolesData.length)
    })


    it('Retorna el rol con el id especificado "GET /roles/:id"', async ()=> {
        const res = await api        
        .get('/roles/1')
        .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body.nombre).toEqual('Rol test 1')
    })

    
    it('Filtra un registro a partir de un texto buscado "GET /roles/filtrar/:texto/:pag"', async ()=>{
        const res = await api        
        .get('/roles/filtrar/test 2/1')
        .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(200)
        expect(res.type).toEqual(expect.stringContaining('json'))
        expect(res.body.count).toEqual(1)
    })

    
    it('Retorna todos los roles "GET /roles/get/all"', async ()=> {
        const res = await api        
        .get('/roles/get/all')
        .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(200)
        expect(res.body.rows.length).toEqual(rolesData.length)
        expect(res.body.rows[1].nombre).toContain('test 2')
        
        //expect(res.body.)
    })


    it('Elimina un registro de la tabla de roles "DELETE /roles/softdelete/:id"', async ()=>{
        const res = await api        
        .delete('/roles/1')
        .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(200)
        expect(res.body.mensaje).toEqual('El rol ha sido eliminado exitosamente.')

        const res2 = await api        
        .delete('/roles/100')
        .auth(token, {type: 'bearer'})

        expect(res2.status).toEqual(200)
        expect(res2.body.mensaje).toEqual('Imposible eliminar el registro: el rol no existe o no fue encontrado.')
    })


    it('Marca un registro como borrado en la tabla de roles "DELETE /roles/softdelete/:id"', async ()=>{
        const res = await api        
        .delete('/roles/softdelete/1')
        .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(200)
        expect(res.body.mensaje).toEqual('El rol ha sido borrado exitosamente.')

        const res2 = await api        
        .delete('/roles/softdelete/1')
        .auth(token, {type: 'bearer'})

        expect(res2.status).toEqual(404)
        expect(res2.body.mensaje).toEqual('Imposible borrar el registro: el rol no existe o no fue encontrado.')
    })

    
    afterAll(()=>{
        //console.log('SERVER afterEach', server)
        if(server) server.close()
    })
    
})
