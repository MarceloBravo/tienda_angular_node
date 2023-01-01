import supertest from 'supertest';
import app from '../src/index.js';
import { server } from '../src/index.js';
import { MenuModel } from '../models/MenuModel.js';
import { menusData, credentials, menuTesting} from './helpers.js';

const api = supertest(app);
let token = '';
let nombreMenu = '';

describe('Test para los endPoints de Menus.', () => {

    beforeAll(async ()=>{
        await MenuModel.destroy({truncate: true, cascade: true, restartIdentity: true});

        //Logueandose para los testings
        const res = await api.post('/login')
            .send(credentials);
        token = res.body.access_token;

        nombreMenu = menuTesting.nombre;
    });

    
    beforeEach(async ()=>{
        await MenuModel.destroy({ truncate : true, cascade: true, restartIdentity: true });

        const menu1 = await MenuModel.create(menusData[0]);
        menu1.save();

        const menu2 = await MenuModel.create(menusData[1]);
        menu2.save();

        const menu3 = await MenuModel.create(menusData[2]);
        menu3.save();

        menuTesting.nombre = nombreMenu;
    });

    
    it('Crea un menú "POST/menus"', async () => {
        const res = await api
            .post('/menus')
            .auth(token, {type: 'bearer'})
            .send(menuTesting)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(res.body.data.nombre).toEqual(menuTesting.nombre);
    });


    it('Retorna todos los registros "GET/menus/get/all"', async () => {
        const res = await api
            .get('/menus/get/all')
            .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(200);
        expect(res.body.rows.length).toEqual(menusData.length);
    });


    it('Retorna la primera página de registros "GET/menus/pag"', async () => {
        const res = await api
            .get('/menus/pag/1/10')
            .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(200);
        expect(res.body.rows.length).toEqual(menusData.length);
    });


    it('Crea y actualiza un menú "PUT/menus"', async () => {  
        let res = await api
            .post('/menus')
            .auth(token, {type: 'bearer'})
            .send(menuTesting)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        menuTesting.nombre = 'Menú editado';

        res = await api
            .put('/menus/'+res.body.data.id)            
            .auth(token, {type: 'bearer'})
            .send(menuTesting)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(res.body.data.nombre).toEqual(menuTesting.nombre);
    });-


    it('Aplica un filtro para retornar un menú "GET/menus/filtrar"', async () => {
        const res = await api
            .get('/menus/filtrar/stem/1/10')
            .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(200);
        expect(res.body.rows.length).toEqual(1);
        expect(res.body.rows[0].nombre).toContain(menusData[1].nombre);
    });


    it('Marca un registro cómo eliminado "DELETE/menus/softdelete"', async () => {
        let res = await api
            .delete('/menus/softdelete/1')            
            .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(200);
        expect(res.body.mensaje).toEqual('El registro ha sido borrado exitosamente.');
        expect(res.body.data).toContain('1');

        res = await api
            .delete('/menus/softdelete/11')            
            .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(404);
        expect(res.body.mensaje).toEqual('Imposible borrar el registro: el menú no fue encontrado o no existe.');
        expect(res.body.data).toContain('11');
    });


    it('Elimina un registro de la  base de datos "DELETE/menus"', async () => {
        let res = await api
            .delete('/menus/1')            
            .auth(token, {type: 'bearer'})

        expect(res.status).toEqual(200);
        expect(res.body.mensaje).toEqual('El registro ha sido eliminado exitosamente.');
        expect(res.body.data).toContain('1');

        res = await api
            .delete('/menus/11')            
            .auth(token, {type: 'bearer'})
            

        expect(res.status).toEqual(200);
        expect(res.body.mensaje).toEqual('Imposible eliminar el resgitro: el menú no existe o no fue encontrado.');
        expect(res.body.data).toContain('11');
    });


    afterAll(()=>{
        if(server) server.close();
    });
    
});


