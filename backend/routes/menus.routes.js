import { Router} from 'express';
import { getMenus, getMenusId, getMenusFilter, getMenusAll, createMenu, updateMenu, deleteMenus, softDeleteMenus, getChildrenMenus } from '../controller/menus.controller.js';
import { checkToken } from '../shared/mw_token.js';
import { storage } from '../shared/mw_uploadFiles.js';
import multer from "multer";   //npm install --save multer
storage.folderPath = '/images/menus';  //Carpeta de destino dentro de la ruta public/images
const uploadFiles = multer({ storage: storage.storage, limits : {fileSize : 1000000}});

const router = Router();

router.get('/menus/parent/:menuPadreId',checkToken, getChildrenMenus);
router.get('/menus/pag/:pag/:rows',checkToken, getMenus);
router.get('/menus/:id', checkToken, getMenusId);
router.get('/menus/filtrar/:texto/:pag/:rows', checkToken, getMenusFilter);
router.get('/menus/get/all', checkToken, getMenusAll);
router.post('/menus', checkToken, uploadFiles.single('file'), createMenu);
router.put('/menus/:id', checkToken, uploadFiles.single('file'), updateMenu);
router.delete('/menus/:id', checkToken, deleteMenus);
router.delete('/menus/softdelete/:id', checkToken, softDeleteMenus);

export default router;