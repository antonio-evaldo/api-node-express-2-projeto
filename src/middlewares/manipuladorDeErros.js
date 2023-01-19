const manipuladorDeErros = (erro, req, res, next) => {
  const statusErro = erro.status || 500;

  res.status(statusErro).send({
    message: erro.message,
    status: statusErro
  });
}

export default manipuladorDeErros;