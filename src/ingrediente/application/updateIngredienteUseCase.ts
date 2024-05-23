import { Ingredientes } from "../domain/ingrediente";
import { IngredienteRepository } from "../domain/ingredienteRepository";

export class UpdateIngredienteUseCase{
    constructor(readonly ingredienteReposity: IngredienteRepository){}

    async run(id:number, ingrediente?:string, cantidad?:number):Promise<Ingredientes| null| string>{
        try {

            return await this.ingredienteReposity.updateIngrediente(id,ingrediente,cantidad);

        } catch (error) {
            return null;
        }

    }
}