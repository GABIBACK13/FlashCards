import Aluno from "../models/alunos";
class AlunoController {
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll({
        attributes: ["id", "nome", "turma", "idade", "media"],
        order: [
          ["id", "DESC"],
          [File, "id", "DESC"],
        ],
        include: {
          model: File,
          attributes: ["filename", "url", "id"],
        },
      });
      res.json(alunos);
    } catch (error) {
      console.error("Erro ao listar alunos:", error);
      return res
        .status(400)
        .json({
          errors: error.errors
            ? error.errors.map((err) => err.message)
            : [error.message],
        });
    }
  }

  async show(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ errors: ["ID inválido"] });
      }
      const aluno = await Aluno.findByPk(req.params.id, {
        attributes: ["id", "nome", "email", "turma", "idade", "media"],
        order: [
          ["id", "DESC"],
          [File, "id", "DESC"],
        ],
        include: {
          model: File,
          attributes: ["filename", "id", "url"],
        },
      });
      res.json(aluno);
    } catch (error) {
      console.error("Erro ao buscar aluno:", error);
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async store(req, res) {
    try {
      const newAluno = await Aluno.create(req.body);
      return res.json(newAluno);
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ errors: ["ID inválido"] });
      }
      const aluno = await Aluno.findByPk(req.params.id);
      if (!aluno) {
        return res.status(400).json({ errors: ["Aluno não encontrado"] });
      }

      const newAluno = await aluno.update(req.body);
      res.json(newAluno);
    } catch (error) {
      console.error("Erro ao buscar aluno:", error);
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ errors: ["ID inválido"] });
      }

      const aluno = await Aluno.findByPk(req.params.id);
      if (!aluno) {
        return res.status(400).json({ errors: ["Usuario não encontrado"] });
      }

      await aluno.destroy();
      return res.json(aluno);
    } catch (error) {
      console.error("Erro ao -Deletar- Aluno", error);
      return res.status(400).json(null);
    }
  }
}

export default new AlunoController();
