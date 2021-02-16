/**
 * Registration routes.
 *
 * @author Alva Persson
 * @version 1.0.0
 */

import express from 'express'
import { ViewSnippetController } from '../controllers/view-snippet-controller.js'

export const router = express.Router()

const controller = new ViewSnippetController()

router.get('/:id', controller.snippetIndex)

router.get('/:id/edit', controller.authorize, controller.edit)
router.post('/:id/update', controller.authorize, controller.update)

router.get('/:id/remove', controller.authorize, controller.remove)
router.get('/:id/delete', controller.authorize, controller.delete)
