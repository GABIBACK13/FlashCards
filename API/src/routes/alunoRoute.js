import { Router } from 'express';
import alunoControler from '../controllers/Aluno';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', alunoControler.index);
router.get('/:id', alunoControler.show);

router.post('/', loginRequired, alunoControler.store);
router.put('/:id', loginRequired, alunoControler.update);
router.delete('/:id', loginRequired, alunoControler.delete);

export default router;