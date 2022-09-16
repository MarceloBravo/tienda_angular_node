import { Router} from 'express';
import { getRoles, getRolesId, getRolesFilter, getRolesAll, postRoles, putRoles, deleteRoles, softDeleteRoles } from '../controller/roles.controller.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/roles/pag/:pag',checkToken, getRoles);
router.get('/roles/:id', checkToken, getRolesId);
router.get('/roles/filtrar/:texto/:pag', checkToken, getRolesFilter);
router.get('/roles/get/all', checkToken, getRolesAll);
router.post('/roles', checkToken, postRoles);
router.put('/roles/:id', checkToken, putRoles);
router.delete('/roles/:id', checkToken, deleteRoles);
router.delete('/roles/softdelete/:id', checkToken, softDeleteRoles);

export default router;