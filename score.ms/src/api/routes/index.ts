import { Router } from 'express';
import { ScoreController } from '../../controllers/score.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { submitScoreSchema } from '../dtos/score.schema';

const router = Router();
const scoreController = new ScoreController();

router.post('/score', validateRequest(submitScoreSchema), scoreController.submitScore);
router.get('/score/top', scoreController.topScore);

export const routes = router; 