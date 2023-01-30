import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: {
    type: String,
    required: [true, "Título do livro é obrigatório."]
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    autopopulate: { select: "nome" },
    required: [true, "Autor(a) é obrigatório."],
  },
  editora: {
    type: String,
    enum: {
      values: ["Casa do código", "Alura"],
      message: "A editora {VALUE} especificada não é um valor permitido.`",
    },
    required: [true, "A editora é obrigatória."],
  },
  numeroPaginas: {
    type: Number,
    validate: {
      validator(valor) {
        return valor >= 10 && valor <= 5000;
      },
      message: "O número de páginas deve ser entre 10 e 5000. Número fornecido: {VALUE}"
    }
  },
});

livroSchema.plugin(autopopulate);

const livros = mongoose.model("livros", livroSchema);

export default livros;
