import  express  from "express";
import { createIngredienteController, getIngredienteController, deleteIngredienteController, updateIngredienteController } from "./dependencies";

export const ingredienteRoute = express.Router();

ingredienteRoute.post("/", createIngredienteController.run.bind(createIngredienteController));

ingredienteRoute.get("/", getIngredienteController.run.bind(getIngredienteController));

ingredienteRoute.delete("/:id", deleteIngredienteController.run.bind(deleteIngredienteController));

ingredienteRoute.put("/:id", updateIngredienteController.run.bind(updateIngredienteController));


