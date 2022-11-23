import fs from 'fs'

const getProductsService = async (req, res) => {
    try {
        const productsString = await fs.promises.readFile('../entregable8Backend2022_Integrador/src/data/productos.txt', "utf-8")
        const  productsArray = await JSON.parse(productsString)

        return productsArray
    } catch (error) {
        console.log("El error de lectura de archivo fue: ", error)
    }
}

const postProductsService = async (req, res) => {
    try {
        await fs.promises.writeFile('../entregable8Backend2022_Integrador/src/data/productos.txt', req)
    } catch (error) {
        console.log(error)
    }
}

export { getProductsService, postProductsService }