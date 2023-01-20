import ErroBase from "./ErroBase.js";

class NaoEncontrado extends ErroBase {
  constructor() {
    super("Recurso não encontrado.", 404);
  }
}

export default NaoEncontrado;