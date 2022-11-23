import { getCartsService, postCartsService } from "../services/cartsService.js";
import { getProductsService } from "../services/productsService.js";

const cartControllerGet = async (req, res) => {
    try {
        const cartsArray = await getCartsService()
        let cartId = req.params.id
        const productsFromCart = cartsArray.filter(cart => cart.id == cartId)[0].products

        res.send(productsFromCart)
    } catch (error) {
        console.log(error)
    }
}

const cartControllerPost = async (req, res) => {
    try {
        const cartsArray = await getCartsService()
    
        let newId = cartsArray.length + 1
        let newTime = new Date()
        const newCart = {
            "id": newId,
            "timestamp": newTime,
            "products":[]
        }
        cartsArray.push(newCart)
        const newCartsString = JSON.stringify(cartsArray, null, "\t")
        const postNewCartsList = await postCartsService(newCartsString)

        res.send(cartsArray)
    } catch (error) {
        console.log(error)
    }

}

const cartControllerProductsPost = async (req, res) => {
    try {
        const cartsArray = await getCartsService()
        let cartId = req.params.id
        let { id, quantity } = req.body

        const productArray = await getProductsService()
        const productToAdd = productArray.filter(product => {
            return product.id == id
        })
        
        let searchedCart = cartsArray.find(cart => cart.id == cartId)
        let productInCart = searchedCart.products.find(product => product.id == id)

        if(productInCart){
            productInCart.quantity += quantity
        } else {
            searchedCart.products.push(productToAdd[0])
            let productInCart = searchedCart.products.find(product => product.id == id)
            productInCart.quantity = quantity
        }
        
        const newCartsString = JSON.stringify(cartsArray, null, "\t")
        const postNewCartsList = await postCartsService(newCartsString)
        res.send(cartsArray)

    } catch (error) {
         console.log(error)
    }
}

const cartControllerDelete = async (req, res) => {
    try {
        const cartsArray = await getCartsService()
        let cartId = req.params.id

        const newCart = cartsArray.filter(cart => cart.id != cartId) 

        const newCartsString = JSON.stringify(newCart, null, "\t")
        const postNewCartsList = await postCartsService(newCartsString)

        res.send(newCart)
    } catch (error) {
        console.log(error)
    }
}

const cartControllerProductDelete = async (req, res) => {
    try {
        const cartsArray = await getCartsService()
        let cartId = req.params.id
        let productId = req.params.id_prod

        const cart = cartsArray.find(cart => cart.id == cartId)
        const productFilter = cart.products.filter(product => product.id != productId)

        cart.products = productFilter

        const newCartsString = JSON.stringify(cartsArray, null, "\t")
        const postNewCartsList = await postCartsService(newCartsString)

        res.send(cartsArray)
    } catch (error) {
        console.log(error)
    }
}

export { cartControllerGet, cartControllerPost, cartControllerProductsPost, cartControllerDelete, cartControllerProductDelete }