import { Ingredientes } from "../domain/ingrediente";
import { IngredienteRepository } from "../domain/ingredienteRepository";

export class GetIngredientesUseCase{
    constructor(readonly ingredienteRepository:IngredienteRepository){}

    async run():Promise<Ingredientes[] | null>{
        try {
            const getIngrediente = await this.ingredienteRepository.getIngredientes();
            return getIngrediente;
        } catch (error) {
            return null;
        }
    }
}