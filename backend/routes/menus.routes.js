import { Router} from 'express';
import { getMenus, getMenusId, getMenusFilter, getMenusAll, postMenus, putMenus, deleteMenus, softDeleteMenus, getChildrenMenus } from '../controller/menus.controller.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/menus/parent/:menuPadreId',checkToken, getChildrenMenus);
router.get('/menus/pag/:pag',checkToken, getMenus);
router.get('/menus/:id', checkToken, getMenusId);
router.get('/menus/filtrar/:texto/:pag', checkToken, getMenusFilter);
router.get('/menus/get/all', checkToken, getMenusAll);
router.post('/menus', checkToken, postMenus);
router.put('/menus/:id', checkToken, putMenus);
router.delete('/menus/:id', checkToken, deleteMenus);
router.delete('/menus/softdelete/:id', checkToken, softDeleteMenus);

export default router;