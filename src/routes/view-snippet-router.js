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

router.get('/:id', controller.viewSnippetIndex)
