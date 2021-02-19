/**
 * View-snippet routes for a single snippet.
 *
 * @author Alva Persson
 * @version 1.0.0
 */

import express from 'express'
import { ViewSnippetController } from '../controllers/view-snippet-controller.js'
import { SnippetsController } from '../controllers/snippets-controller.js'

export const router = express.Router()

const controller = new ViewSnippetController()
const snippetsController = new SnippetsController()

router.get('/:id', controller.snippetIndex)

router.get('/:id/edit', snippetsController.authenticate, controller.authorize, controller.edit)
router.post('/:id/update', snippetsController.authenticate, controller.authorize, controller.update)

router.get('/:id/remove', snippetsController.authenticate, controller.authorize, controller.remove)
router.post('/:id/delete', snippetsController.authenticate, controller.authorize, controller.delete)
router.get('/:id/nodelete', snippetsController.authenticate, controller.authorize, controller.nodelete)
