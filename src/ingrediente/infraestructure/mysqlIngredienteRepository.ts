import { Ingredientes } from "../domain/ingrediente";
import { IngredienteRepository } from "../domain/ingredienteRepository";
import { query } from "../../database/mysql";



export class MysqlIngredienteRepository implements IngredienteRepository{

    async createIngrediente(ingrediente:string, cantidad:number): Promise<Ingredientes | null> {
        try {
            const sql ="INSERT INTO ingredientes (ingrediente, cantidad) VALUES (?, ?)";
            const params: any[] = [ingrediente, cantidad];
            const result: any = await query(sql,params);

            const id = result.id;
            return new Ingredientes(id,ingrediente, cantidad);

        } catch (error) {
            console.error("Error creating product:", error);
            return null;
        }
    }

    async getIngredientes(): Promise<Ingredientes[] | null> {
        try {
            const sql = "SELECT * FROM ingredientes";
            const [result]: any = await query(sql, []);
            if (result.length > 0) {
                const products: Ingredientes[] = result.map((row: any) => new Ingredientes(row.id,row.ingrediente, row.cantidad));
                return products;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            return null;
        }
    }

    async deleteIngrediente(id: number): Promise<Ingredientes | null| string> {
        try {
            const sql = "DELETE FROM ingredientes WHERE id = ?";
            const [result]: any = await query(sql, [id]);
            
            if (result && result.affectedRows !== undefined) {
                if (result.affectedRows === 0) {
                    return "No se pudo eliminar el ingrediente.";
                } else {
                    return "Ingrediente eliminado exitosamente.";
                }
            } else {
                return "No se pudo eliminar el ingrediente.";
            }
        } catch (error) {
            console.error("Error deleting Ingrediente:", error);
            return "No se pudo eliminar el Ingrediente.";
        }
        
    }

    async updateIngrediente(id: number, ingrediente?: string | undefined, cantidad?: number | undefined): Promise<Ingredientes | null> {
        try {
            // Primero obtenemos los datos actuales del ingrediente
            const [currentData]: any = await query("SELECT * FROM ingredientes WHERE id = ?", [id]);
    
            if (currentData.length === 0) {
                return null;  // Si no se encuentra el ingrediente, retornamos null
            }
    
            // Actualizamos solo los campos proporcionados en la solicitud
            const currentIngrediente = currentData[0];
            const updatedIngrediente = {
                ingrediente: ingrediente !== undefined ? ingrediente : currentIngrediente.ingrediente,
                cantidad: cantidad !== undefined ? cantidad : currentIngrediente.cantidad
            };
    
            // Ejecutamos la actualización
            const sql = "UPDATE ingredientes SET ingrediente = ?, cantidad = ? WHERE id = ?";
            const params: any[] = [updatedIngrediente.ingrediente, updatedIngrediente.cantidad, id];
            const [result]: any = await query(sql, params);
    
            if (result.affectedRows > 0) {
                return new Ingredientes(id, updatedIngrediente.ingrediente, updatedIngrediente.cantidad);
            } else {
                return null;  // Si no se actualizó ninguna fila, devolvemos null
            }
        } catch (error) {
            console.error("Error updating ingredient:", error);
            return null;
        }
    }

    
    
}
    
