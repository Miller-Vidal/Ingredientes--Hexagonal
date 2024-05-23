import { Request, Response } from "express";
import { CreateIngredienteUseCase } from "../../application/createIngredienteUseCase";
import { Ingredientes } from "../../domain/ingrediente";


export class CreateIngredienteController{
    constructor(readonly createIngrediente:CreateIngredienteUseCase){}

    async run(req:Request, res: Response){
        try {
            let {ingrediente, cantidad } = req.body;

            const postIngrediente = await this.createIngrediente.run(ingrediente, cantidad);

            if (postIngrediente instanceof Ingredientes) {
                return res.status(201).send({
                    id : postIngrediente.id,
                    ingrediente: postIngrediente.ingrediente,
                    cantidad: postIngrediente.cantidad
                })
            }
            else {
                res.status(404).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al crear el ingrediente"
                })
            }
        } catch (error) {
            if (error instanceof Error) {

                if (error.message.startsWith('[')) {

                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while adding the ingrediente."
            });
            
        }
    }
}