import { Router} from 'express';
import { getRoles, getRolesId, getRolesFilter, getRolesAll, postRoles, putRoles, deleteRoles, softDeleteRoles } from '../controller/roles.controller.js';
//import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/roles/pag/:pag',getRoles);
router.get('/roles/:id', getRolesId);
router.get('/roles/filtrar/:texto/:pag', getRolesFilter);
router.get('/roles/get/all', getRolesAll);
router.post('/roles', postRoles);
router.put('/roles/:id', putRoles);
router.delete('/roles/:id', deleteRoles);
router.delete('/roles/softdelete/:id', softDeleteRoles);

export default router;