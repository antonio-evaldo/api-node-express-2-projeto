function manipulador404(req, res, next) {
  const erro404 = new Error("Página não encontrada.");
  erro404.status = 404;

  next(erro404);
}

export default manipulador404;