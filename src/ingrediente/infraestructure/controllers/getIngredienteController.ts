import { Request, Response } from "express";
import { GetIngredientesUseCase } from "../../application/getIngredientesUseCase";


export class GetIngredienteController{

    constructor(readonly getIngredienteUseCase:GetIngredientesUseCase){};

    async run(req:Request, res:Response){
        try {
            const getIngrediente = await this.getIngredienteUseCase.run()

            if (getIngrediente) {
                return res.status(200).json(getIngrediente);
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