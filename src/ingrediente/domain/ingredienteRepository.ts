import { Ingredientes } from "./ingrediente";


export interface IngredienteRepository{

    createIngrediente(ingrediente:string, cantidad:number):Promise<Ingredientes | null>;

    getIngredientes():Promise<Ingredientes[]| null>;

    deleteIngrediente(id:number):Promise<Ingredientes| null | string>;

    updateIngrediente(id:number, ingrediente?:string, cantidad?:number):Promise<Ingredientes | null>;

}