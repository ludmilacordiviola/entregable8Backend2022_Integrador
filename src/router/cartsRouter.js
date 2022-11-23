import express from 'express'
import { cartControllerDelete, cartControllerGet, cartControllerPost, cartControllerProductDelete, cartControllerProductsPost } from '../controllers/cartsController.js'

const router = express.Router()

router.get('/:id/products', cartControllerGet)
router.post('/', cartControllerPost)
router.post('/:id/products', cartControllerProductsPost)
router.delete('/:id', cartControllerDelete)
router.delete('/:id/products/:id_prod', cartControllerProductDelete)

export default router