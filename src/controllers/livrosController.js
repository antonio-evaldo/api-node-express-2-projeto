import { livros } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {

  static listarLivros = (req, res, next) => {
    livros.find((err, livros) => {
      if (!err) {
        res.status(200).json(livros);
      } else {
        next(err);
      }
  })
  }

  static listarLivroPorId = (req, res, next) => {
    const id = req.params.id;

    livros
      .findById(id, {}, { autopopulate: false })
      .populate('autor')
      .exec((err, livro) => {
        if (!err) {
          if (livro !== null) {
            res.status(200).send(livro);
          } else {
            next(new NaoEncontrado());
          }
        } else {
          next(err);
        }  
    })
  }

  static cadastrarLivro = (req, res, next) => {
    let livro = new livros(req.body);

    livro.save((err) => {
      if (!err) {
        res.status(201).send(livro.toJSON());
      } else {
        next(err);
      }
    })
  }

  static atualizarLivro = (req, res, next) => {
    const id = req.params.id;

    livros.findByIdAndUpdate(id, {$set: req.body}, { runValidators: true }, (err, livro) => {
      if (!err) {
        if (livro !== null) {
          res.status(200).send({ message: "Livro atualizado com sucesso" });
        } else {
          next(new NaoEncontrado());
        }
      } else {
        next(err);
      } 
    })
  }

  static excluirLivro = (req, res, next) => {
    const id = req.params.id;

    livros.findByIdAndDelete(id, (err, livro) => {
      if (!err) {
        if (livro !== null) {
          res.status(200).send({ message: "Livro removido com sucesso" });
        } else {
          next(new NaoEncontrado());
        }
      } else {
        next(err);
      } 
    })
  }

  static listarLivroPorEditora = (req, res, next) => {
    const { editora, minPaginas, maxPaginas } = req.query;

    let busca = {};

    if (editora) busca.editora = { $regex: editora, $options: "i" };

    if (minPaginas || maxPaginas) busca.numeroPaginas = {};
    if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
    if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

    livros.find(
      busca,
      {},
      (err, livros) => {
        if (!err) {
          res.status(200).send(livros);
        } else {
          console.log(err);
          next(err);
        }
      }
    )
  }
}

export default LivroController