import express from 'express'
import { productControllerGet, productControllerPost, productControllerPut, productControllerDelete} from '../controllers/productsController.js'
import { validAdmin } from '../utils/middleware.js'

const router = express.Router()

router.get('/:id?', productControllerGet)
router.post('/', validAdmin, productControllerPost)
router.put('/:id', validAdmin, productControllerPut)
router.delete('/:id', validAdmin, productControllerDelete)

export default router