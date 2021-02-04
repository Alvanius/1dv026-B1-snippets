/**
 * Home routes.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import express from 'express'
import { HomeController } from '../controllers/home-controller.js'

export const router = express.Router()

const controller = new HomeController()

router.post('/log-in', controller.loginPost)
router.get('/', controller.index)
