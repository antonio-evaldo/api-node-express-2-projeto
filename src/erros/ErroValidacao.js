import mongoose from "mongoose";
import ErroBase from "./ErroBase.js";

class ErroValidacao extends ErroBase {
  constructor(erros = []) {
    const mensagensErro = Object.values(erros)
      .map((erro) => {
        if (erro instanceof mongoose.Error.CastError) {
          return `Dado "${erro.path}" inválido.`
        }
        
        return erro.message;
      })
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${mensagensErro}`, 400);
  }
}

export default ErroValidacao;