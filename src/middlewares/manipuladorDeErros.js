import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

const manipuladorDeErros = (erro, req, res, next) => {
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().send(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(erro.errors).send(res);
  } else if (erro instanceof ErroBase) {
    erro.send(res);
  } else {
    new ErroBase().send(res);
  }
};

export default manipuladorDeErros;
