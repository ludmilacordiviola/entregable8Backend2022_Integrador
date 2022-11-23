import { getProductsService, postProductsService } from "../services/productsService.js";

const productControllerGet = async (req, res) => {
    try {
        if(req.params.id){
            const productsResponse = await getProductsService()
            const productosFiltrados = productsResponse.filter(product => {
                return product.id == req.params.id
            })
            res.send(productosFiltrados)
        } else {
            const productsResponse = await getProductsService(req)
            res.send(productsResponse)
        }
    } catch (error) {
        console.log(error)
    }
}

const productControllerPost = async (req, res) => {
    try {
        const productsResponse = await getProductsService()
        let id = productsResponse.length + 1
        let time = new Date()
        let { title, description, code, thumbnail, price, stock } = req.body

        const newProduct = {
            "id":id,
            "timestamp":time,
            "title":title,
            "description": description,
            "code":code,
            "thumbnail":thumbnail,
            "price":price,
            "stock":stock
        };

        productsResponse.push(newProduct)
        const newProductsListString = JSON.stringify(productsResponse, null, "\t")

        const postNewProductsList = await postProductsService(newProductsListString)
        res.send(productsResponse)

    } catch (error) {
        console.log(error)
    }
}

const productControllerPut = async (req, res) => {
    try {
        const productsResponse = await getProductsService()
        let idToUpdate = req.params.id
        let time = new Date()
        let { id, title, description, code, thumbnail, price, stock } = req.body

        const productToRefresh = {
            "id":id,
            "timestamp":time,
            "title":title,
            "description": description,
            "code":code,
            "thumbnail":thumbnail,
            "price":price,
            "stock":stock
        };

        //Map con ternario para insertar el producto actualizado
        const updateProducts = productsResponse.map(product => product.id == idToUpdate?productToRefresh:product)

        const newProductsListString = JSON.stringify(updateProducts, null, "\t")
        const postNewProductsUpdateList = await postProductsService(newProductsListString)
        
        res.send(updateProducts)
    } catch (error) {
        console.log(error)
    }
}

const productControllerDelete = async (req, res) => {
    try {
        const productsResponse = await getProductsService()
        let idToDelete = req.params.id

        const arrayDeletedProduct = productsResponse.filter(product => product.id != idToDelete)
        const newProductsListString = JSON.stringify(arrayDeletedProduct, null, "\t")
        const postNewProductsUpdateList = await postProductsService(newProductsListString)

        res.send(arrayDeletedProduct)
    } catch (error) {
        console.log(error)
    }
}


export { productControllerGet, productControllerPost, productControllerPut, productControllerDelete }