const { Aluno } = require("../models");

async function criarAluno() {
  try {
    const novoAluno = await Aluno.create({
      nome: "José da Silva",
      turma: "3A",
      email: "dado@aluno.com",
      idade: 27,
      media: 7.8,
    });

    console.log("aluno criado:", novoAluno.toJSON());
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
  }
}
 async function listarAlunos() {
  try {
    const alunos = await Aluno.findAll();
    console.log("Alunos:", alunos.map((aluno) => aluno.toJSON()));
  } catch (error) {
    console.error("Erro ao listar alunos:", error);
  }
}
