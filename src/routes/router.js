/**
 * The routes.
 *
 * @author Alva Persson
 * @version 1.0.0
 */

import express from 'express'
import { router as homeRouter } from './home-router.js'
import { router as snippetsRouter } from './snippets-router.js'
/* import { router as registrationRouter } from './registration-router.js' */

export const router = express.Router()

router.use('/', homeRouter)
router.use('/snippets', snippetsRouter)

/* router.use('/register', registrationRouter) */

router.use('*', (req, res, next) => {
  const error = new Error()
  error.status = 404
  error.message = 'Not Found'
  next(error)
})
