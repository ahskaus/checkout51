import { Router } from 'express';

import * as controllers from '../controllers/all';

let api = Router();

api.get('/offers', controllers.getOffers);

export default api;