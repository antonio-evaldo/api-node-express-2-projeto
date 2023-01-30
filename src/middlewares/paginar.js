async function paginar(req, res, next) {
  try {
    let { pagina = 1, limite = 5, campoOrdenacao = "_id", ordem = -1 } = req.query;
  
    if (pagina < 1) pagina = 1;
    if (limite < 1) limite = 5;
  
    const resultado = req.resultado;

    const resultadoPaginado = await resultado
      .sort({ [campoOrdenacao]: ordem })
      .skip((pagina - 1) * limite)
      .limit(limite);

    res.status(200).send(resultadoPaginado);
  } catch (error) {
    next(error);
  }
}

export default paginar;