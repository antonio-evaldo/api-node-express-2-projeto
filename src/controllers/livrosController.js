import { autores, livros } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const resultado = await livros.find();
      res.status(200).json(resultado);
    } catch (err) {
      next(err);
    }
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

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);
  
      if (busca) {
        const livro = await livros.find(busca);
        res.status(200).send(livro);
      } else {
        res.status(200).send([]);
      }
    } catch (err) {
      next(err);
    }
  }
}

async function processaBusca({ editora, minPaginas, maxPaginas, nomeAutor }) {
  let buscaLivro = {};

  if (editora) buscaLivro.editora = { $regex: editora, $options: "i" };

  if (minPaginas || maxPaginas) buscaLivro.numeroPaginas = {};
  if (minPaginas) buscaLivro.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) buscaLivro.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne(
      { nome: { $regex: nomeAutor, $options: "i" } }
    );

    if (autor) {
      buscaLivro.autor = autor._id;
    } else {
      buscaLivro = null;
    }
  }

  return buscaLivro;
}

export default LivroController