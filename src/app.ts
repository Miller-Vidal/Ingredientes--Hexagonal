import express from "express";
import cors from "cors";
import { Signale } from 'signale';
import { ingredienteRoute } from "./ingrediente/infraestructure/ingredienteRoute";

const app = express();
const signale = new Signale();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/ingredientes',ingredienteRoute);


const port = process.env.PORT || 3001;
app.listen(port, () => {
  signale.log(`Corriendo en el puerto ${port}`);
});