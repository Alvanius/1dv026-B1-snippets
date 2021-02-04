/**
 * Registration routes.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import express from 'express'
import { RegistrationController } from '../controllers/registration-controller.js'

export const router = express.Router()

const controller = new RegistrationController()

router.get('/', controller.registerIndex)
router.post('/', controller.registerPost)
