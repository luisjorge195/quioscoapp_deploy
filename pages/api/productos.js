import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  const prisma = new PrismaClient() //creamos una instancia
  const productos = await prisma.producto.findMany({
    where: {
        categoriaId: 1
    }
  }) //buscamos todas las categorias
  res.status(200).json(productos) //devolvemos las categorias
}
