import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { JobPostValidation } from './job.validation'
import { JobPostController } from './job.controller'

const router = express.Router()

router.get('/', validateRequest(JobPostValidation.createJobPost), JobPostController.createJobPost)


export const JobPostRouter = router