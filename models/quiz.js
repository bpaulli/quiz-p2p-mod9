/// <reference path="../typings/sequelize/sequelize.d.ts" />

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Quiz',
    { pregunta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Pregunta"}}
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Respuesta"}}
      },
      tema: {
         type: DataTypes.STRING,
         validate: {
           isIn: [[ 'Otro', 'Humanidades' , 'Ocio' , 'Tecnologia' , 'Ciencia']],
           notEmpty: {msg: "-> Falta Tema"}
           }
      }
    }
  );
};