import { Router } from 'express';
import { PlayerController } from '../../controllers/player.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { createPlayerSchema, updatePlayerSchema } from '../dtos/create-player.schema';
import { PlayerService } from '../../services/player.service';

const router = Router();
const playerService = new PlayerService();
const playerController = new PlayerController(playerService);

router.post('/players', validateRequest(createPlayerSchema), playerController.createPlayer);
router.get('/player/:playerId', playerController.getPlayer);
router.put('/player/:playerId', validateRequest(updatePlayerSchema), playerController.updatePlayer);
router.delete('/player/:playerId', playerController.deletePlayer);

export const routes = router; 