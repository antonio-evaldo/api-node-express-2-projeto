import mongoose from "mongoose";
import livros from "../models/Livro.js";

import ErroValidacao from "../erros/ErroValidacao.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

class LivroController {

  static listarLivros = (req, res) => {
    livros.find()
      .populate('autor')
      .exec((err, livros) => {
        if (!err) {
          res.status(200).json(livros);
        } else {
          next(err);
        }
  })
  }

  static listarLivroPorId = (req, res, next) => {
    const id = req.params.id;

    livros.findById(id)
      .populate('autor', 'nome')
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

  static listarLivroPorEditora = (req, res) => {
    const editora = req.query.editora

    livros.find({'editora': editora}, {}, (err, livros) => {
      if (!err) {
        res.status(200).send(livros);
      } else {
        next(err);
      }
    })
  }
}

export default LivroController