import express from 'express';
import { PageController } from './page.controller';

const router = express.Router();

router.get('/:title', PageController.getSinglePage);

router.get('/', PageController.getAllPage);

router.post('/create-page', PageController.createPage);

router.patch('/:id', PageController.updatePage);

router.delete('/:id', PageController.deletePage);

export const PageRoutes = router;
