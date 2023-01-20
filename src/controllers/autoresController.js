import mongoose from "mongoose";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = (req, res) => {
    autores.find((err, autores) => {
      res.status(200).json(autores);
    });
  };

  static listarAutorPorId = (req, res, next) => {
    const id = req.params.id;

    autores.findById(id, (err, autor) => {
      if (!err) {
        if (autor !== null) {
          res.status(200).send(autor);
        } else {
          next(new NaoEncontrado());
        }
      } else {
        if (err instanceof mongoose.Error.CastError) {
          next(new RequisicaoIncorreta());
        } else {
          next(err);
        }
      }      
    });
  };

  static cadastrarAutor = (req, res) => {
    let autor = new autores(req.body);

    autor.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar Autor.` });
      } else {
        res.status(201).send(autor.toJSON());
      }
    });
  };

  static atualizarAutor = (req, res) => {
    const id = req.params.id;

    autores.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: "Autor atualizado com sucesso" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static excluirAutor = (req, res) => {
    const id = req.params.id;

    autores.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "Autor removido com sucesso" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };
}

export default AutorController;
