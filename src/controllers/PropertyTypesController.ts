import { RouteHandler } from "fastify";
import prisma from "../config/prisma";
import { z } from "zod";

const SaveTypeSchema = z.object({name: z.string()})
const RouteParamsSchema = z.object({id: z.string() })

export class PropertyTypesController {
    index: RouteHandler = async (request, reply) => {
        try {
            return prisma.propertyType.findMany()
        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }   

    save: RouteHandler = async (request, reply) => {
        try {
            const data = SaveTypeSchema.parse(request.body)
            await prisma.propertyType.create({ data })
            return reply.status(201).send()
        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }   

    update: RouteHandler = async (request, reply) => {
        try {
            const {id} = RouteParamsSchema.parse(request.params)
            const data = SaveTypeSchema.parse(request.body)
            await prisma.propertyType.update({ where: {id}, data })
            return reply.status(204).send()
        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }   

    delete: RouteHandler = async (request, reply) => {
        try {
            const {id} = RouteParamsSchema.parse(request.params)
            await prisma.propertyType.delete({where: {id} })
            return reply.status(204).send()
        } catch (error: any) {
            return reply.status(500).send({message: error.message})
        }
    }   
}