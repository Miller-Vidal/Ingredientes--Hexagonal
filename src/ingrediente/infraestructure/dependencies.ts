import { MysqlIngredienteRepository } from "./mysqlIngredienteRepository";

import { CreateIngredienteUseCase } from "../application/createIngredienteUseCase";
import { CreateIngredienteController } from "./controllers/createIngredienteController";

import { GetIngredientesUseCase } from "../application/getIngredientesUseCase";
import { GetIngredienteController } from "./controllers/getIngredienteController";

import { DeleteIngredienteUseCase } from "../application/deleteIngredienteUseCase";
import { DeleteIngredienteController } from "./controllers/deleteIngredienteController";

import { UpdateIngredienteUseCase } from "../application/updateIngredienteUseCase";
import { UpdateIngredienteController } from "./controllers/updateIngredienteController";

export const mysqlIngredienteRepository = new MysqlIngredienteRepository();

export const createIngredienteUseCase = new CreateIngredienteUseCase(mysqlIngredienteRepository);
export const createIngredienteController = new CreateIngredienteController(createIngredienteUseCase);

export const getIngredientesUseCase = new GetIngredientesUseCase(mysqlIngredienteRepository);
export const getIngredienteController = new GetIngredienteController(getIngredientesUseCase);

export const deleteIngredienteUseCase = new DeleteIngredienteUseCase(mysqlIngredienteRepository);
export const deleteIngredienteController = new DeleteIngredienteController(deleteIngredienteUseCase);

export const updateIngredienteUseCase = new UpdateIngredienteUseCase(mysqlIngredienteRepository);
export const updateIngredienteController = new UpdateIngredienteController(updateIngredienteUseCase);