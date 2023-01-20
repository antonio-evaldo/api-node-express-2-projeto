import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: true },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: true,
  },
  editora: {
    type: String,
    enum: {
      values: ["Casa do código", "Alura"],
      message: "A editora {VALUE} especificada não é um valor permitido.`",
    },
    required: true,
  },
  numeroPaginas: {
    type: Number,
    min: [
      10,
      "O número de páginas deve ser entre 10 e 5000. Número fornecido: {VALUE}",
    ],
    max: [
      5000,
      "O número de páginas deve ser entre 10 e 5000. Número fornecido: {VALUE}",
    ],
  },
});

const livros = mongoose.model("livros", livroSchema);

export default livros;
