import { Router} from 'express';
import { getUsuarios, getUsuariosId, getUsuariosFilter, getUsuariosAll, postUsuarios, putUsuarios, deleteUsuarios, softDeleteUsuarios } from '../controller/usuarios.controller.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/usuarios/pag/:pag',checkToken, getUsuarios);
router.get('/usuarios/:id', checkToken, getUsuariosId);
router.get('/usuarios/filtrar/:texto/:pag', getUsuariosFilter);
router.get('/usuarios/get/all', checkToken, getUsuariosAll);
router.post('/usuarios', checkToken, postUsuarios);
router.put('/usuarios/:id', checkToken, putUsuarios);
router.delete('/usuarios/:id', checkToken, deleteUsuarios);
router.delete('/usuarios/softdelete/:id', checkToken, softDeleteUsuarios);

export default router;