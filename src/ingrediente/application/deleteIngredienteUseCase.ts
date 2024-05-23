import { Ingredientes } from "../domain/ingrediente";
import { IngredienteRepository } from "../domain/ingredienteRepository";

export class DeleteIngredienteUseCase{
    constructor(readonly ingredienteReposity: IngredienteRepository){}

    async run(id:number):Promise<Ingredientes| null| string>{
        try {
            return await this.ingredienteReposity.deleteIngrediente(id);

        } catch (error) {
            return null;
        }

    }
}