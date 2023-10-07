import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { z } from 'zod'

const app = fastify()

const prisma = new PrismaClient()

app.get('/denuncia', async () => {
    const denuncia = await prisma.denuncia.findMany()

    return{ denuncia }
})

app.post('/denuncia', async (request, reply) => {
    const createDenunciaSchema = z.object({
        latitude: z.number(),
        longitude: z.number(),
        imagem: z.string(),
        textoDenuncia: z.string(),
    })

    const{ latitude, longitude, imagem, textoDenuncia} = createDenunciaSchema.parse(request.body)

    await prisma.denuncia.create({
        data:{
            latitude, 
            longitude, 
            imagem, 
            textoDenuncia
        }
    })
    return reply.status(201).send()
})


app.listen({ 
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT):3333,
    }).then(() => {
    console.log('HTTP Server running')
})