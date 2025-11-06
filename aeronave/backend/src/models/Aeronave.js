const mongoose = require("mongoose");

const AeronaveSchema = mongoose.Schema({
   id_ocorrencia_a: String,
   matricula: String,
   operador_categoria: String,
   tipo_veiculo: String,
   fabricante: String,
   modelo: String,
   motor_tipo: String,
   motor_quantidade: String,
   assentos: String,
   ano_fabricacao: String,
   pais_fabricante: String,
   registro_segmento: String,
   voo_origem: String,
   voo_destino: String,
   fase_operacao: String
});
module.exports = mongoose.model("Aeronave", AeronaveSchema);
