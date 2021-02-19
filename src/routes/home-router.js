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

router.get('/', controller.redirectIfLoggedIn, controller.index)
router.get('/sign-up', controller.redirectIfLoggedIn, controller.signupIndex)
router.post('/log-in', controller.redirectIfLoggedIn, controller.loginPost)
router.post('/sign-up', controller.redirectIfLoggedIn, controller.signupPost)
router.get('/browse-snippets', controller.redirectIfLoggedIn, controller.guestSnippetsIndex)
