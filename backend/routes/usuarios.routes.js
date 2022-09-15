import { Router} from 'express';
import { getUsuarios, getUsuariosId, getUsuariosFilter, getUsuariosAll, postUsuarios, putUsuarios, deleteUsuarios, softDeleteUsuarios } from '../controller/usuarios.controller.js';
//import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/usuarios/pag/:pag',getUsuarios);
router.get('/usuarios/:id', getUsuariosId);
router.get('/usuarios/filtrar/:texto/:pag', getUsuariosFilter);
router.get('/usuarios/get/all', getUsuariosAll);
router.post('/usuarios', postUsuarios);
router.put('/usuarios/:id', putUsuarios);
router.delete('/usuarios/:id', deleteUsuarios);
router.delete('/usuarios/softdelete/:id', softDeleteUsuarios);

export default router;