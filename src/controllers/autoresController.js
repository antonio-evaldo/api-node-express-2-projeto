import { autores } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class AutorController {
  static listarAutores = (req, res, next) => {
    try {
      req.resultado = autores.find();
      
      next();
    } catch (err) {
      next(err);
    }
    ;
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
        next(err);
      }      
    });
  };

  static cadastrarAutor = (req, res, next) => {
    let autor = new autores(req.body);

    autor.save((err) => {
      if (!err) {
        res.status(201).send(autor.toJSON());
      } else {
        next(err);
      }
    });
  };

  static atualizarAutor = (req, res, next) => {
    const id = req.params.id;

    autores.findByIdAndUpdate(id,{ $set: req.body },{ runValidators: true },(err, autor) => {
      if (!err) {
        if (autor !== null) {
          res.status(200).send({ message: "Autor atualizado com sucesso" });
        } else {
          next(new NaoEncontrado());
        }
      } else {
        next(err);
      } 
    });
  };

  static excluirAutor = (req, res, next) => {
    const id = req.params.id;

    autores.findByIdAndDelete(id, (err, autor) => {
      if (!err) {
        if (autor !== null) {
          res.status(200).send({ message: "Autor removido com sucesso" });
        } else {
          next(new NaoEncontrado());
        }
      } else {
        next(err);
      } 
    });
  };
}

export default AutorController;
