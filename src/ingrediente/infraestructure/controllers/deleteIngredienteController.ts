import { Request, Response } from "express";
import { DeleteIngredienteUseCase } from "../../application/deleteIngredienteUseCase";

export class DeleteIngredienteController{

    constructor(readonly deleteIngredienteUseCase:DeleteIngredienteUseCase){};

    async run(req:Request, res:Response){
        try {

            let {id} = req.params;
            const idInt = parseInt(id, 10);
            const deleteIngrediente = await this.deleteIngredienteUseCase.run(idInt);

            if (deleteIngrediente) {
                return res.status(200).
                send(
                    deleteIngrediente
                )
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