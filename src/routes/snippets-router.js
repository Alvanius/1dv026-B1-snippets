/**
 * Registration routes.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import express from 'express'
import { SnippetsController } from '../controllers/snippets-controller.js'

export const router = express.Router()

const controller = new SnippetsController()

router.get('/', controller.authenticate, controller.snippetsIndex)
router.get('/my-page', controller.authenticate, controller.mypageIndex)
router.get('/new', controller.authenticate, controller.newSnippetIndex)
