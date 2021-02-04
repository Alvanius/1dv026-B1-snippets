/**
 * The routes.
 *
 * @author Alva Persson
 * @version 1.0.0
 */

import express from 'express'

export const router = express.Router()

router.use('*', (req, res, next) => {
  const error = new Error()
  error.status = 404
  error.message = 'Not Found'
  next(error)
})
