/**
 * The starting point of the application.
 *
 * @author Alva Persson
 * @version 1.0.0
 */

import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import hbs from 'express-hbs'
import logger from 'morgan'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'

/**
 * The main function of  the application.
 */
const main = async () => {
  try {
    await connectDB()
  } catch (error) {
    console.log(error.message)
    process.exitCode = 1
    return // If no database connection can be established there´s no point in starting up the server.
  }

  const PORT = process.env.PORT || 5000
  const baseURL = process.env.BASE_URL || '/'
  const directoryFullName = dirname(fileURLToPath(import.meta.url))
  const app = express()

  // ------------------------------------
  //         Middleware section
  // ------------------------------------
  app.use(logger('dev'))
  app.use(helmet())
  app.set('trust proxy', 1)
  app.set('view engine', 'hbs')

  // Configurations of the view engine.
  app.engine('hbs', hbs.express4({
    defaultLayout: join(directoryFullName, 'views', 'layouts', 'default'),
    partialsDir: join(directoryFullName, 'views', 'partials')
  }))
  app.set('views', join(directoryFullName, 'views'))

  app.use(express.urlencoded({ extended: false }))
  app.use(express.static(join(directoryFullName, '..', 'public')))

  // Setup for session middleware express-session
  const sessionOptions = {
    name: 'snippetApp',
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'lax'
    }
  }

  app.use(session(sessionOptions))

  app.use(function (req, res, next) {
    // Flash messages and delete indication only survives for a round trip
    if (req.session.flash) {
      res.locals.flash = req.session.flash
      delete req.session.flash
    }
    if (req.session.deleteSnippet) {
      res.locals.deleteSnippet = req.session.deleteSnippet
      delete req.session.deleteSnippet
    }

    if (req.session.userIsLoggedIn) {
      res.locals.loggedIn = true
      res.locals.nameOfUser = req.session.user
    }
    res.locals.baseURL = baseURL
    next()
  })

  app.use('/', router)

  app.use(function (err, req, res, next) {
    let errortext = 'Sorry, but something went wrong.'
    let error = '500 Internal server error'
    let title = 'An error occured'
    if (err.status === 404) {
      errortext = 'Sorry, but the page you were trying to view does not exist.'
      error = '404 Not Found'
      title = 'Page not found'
    } else if (err.status === 403) {
      errortext = 'You don\'t have access to the action requested.'
      error = '403 Forbidden'
      title = 'Forbidden'
    }
    res
      .status(err.status || 500)
      .render('errors/error', { error, errortext, title })
  })

  // ------------------------------------
  //      End of Middleware section
  // ------------------------------------

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
}

main()
