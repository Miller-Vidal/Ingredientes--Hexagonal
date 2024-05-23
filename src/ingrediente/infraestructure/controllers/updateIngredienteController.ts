import { Request, Response } from "express";
import { UpdateIngredienteUseCase } from "../../application/updateIngredienteUseCase";


export class UpdateIngredienteController{

    constructor(readonly updateIngredienteUseCase:UpdateIngredienteUseCase){};

    async run(req:Request, res:Response){
        try {
            let {id} = req.params;
            const idInt = parseInt(id, 10);
            let{ingrediente, cantidad} = req.body;
            const updateIngrediente = await this.updateIngredienteUseCase.run(idInt,ingrediente,cantidad)

            if (updateIngrediente) {
                return res.status(200).send(updateIngrediente);
            }
            else {
                res.status(404).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al actualizar el ingrediente"
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