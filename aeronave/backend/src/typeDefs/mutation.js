const { gql } = require("apollo-server");
const mutation = gql`
   type Mutation {
      createAeronave(aeronave: AeronaveInput): Aeronave
      updateAeronave(id: String, aeronave: AeronaveInput): Aeronave
      deleteAeronave(id: String): Aeronave
   }
  input AeronaveInput {
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
   }
`;
module.exports = mutation;
