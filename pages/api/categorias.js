import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  const prisma = new PrismaClient() //creamos una instancia
  const categorias = await prisma.categoria.findMany({
    include:{
      productos: 1
    }
  }) //buscamos todas las categorias
  res.status(200).json(categorias) //devolvemos las categorias
}
