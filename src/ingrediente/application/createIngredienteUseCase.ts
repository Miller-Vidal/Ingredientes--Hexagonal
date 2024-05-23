import { Ingredientes } from "../domain/ingrediente";
import { IngredienteRepository } from "../domain/ingredienteRepository";

export class CreateIngredienteUseCase{

    constructor(readonly ingredienteRepository:IngredienteRepository){}

    async run(ingrediente:string, cantidad:number):Promise<Ingredientes | null>{
        try {
            
            return await this.ingredienteRepository.createIngrediente(ingrediente,cantidad)
            
        } catch (error) {
            return null;
        }
    }
}