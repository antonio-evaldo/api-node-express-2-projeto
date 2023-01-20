import ErroBase from "../erros/ErroBase.js";

const manipuladorDeErros = (erro, req, res, next) => {
  if (erro instanceof ErroBase) {
    erro.send(res);
  } else {
    new ErroBase().send(res);
  }
};

export default manipuladorDeErros;
