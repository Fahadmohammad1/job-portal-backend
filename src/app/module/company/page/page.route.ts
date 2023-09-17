import express from 'express';
import { PageController } from './page.controller';

const router = express.Router();

router.post('/create-page', PageController.createPage);

export const PageRoutes = router;
