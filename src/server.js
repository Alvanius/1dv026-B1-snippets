/**
 * The starting point of the application.
 *
 * @author Alva Persson
 * @version 1.0.0
 */

import express from 'express'
import session from 'express-session'
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
  //  Connect to the database.
  try {
    await connectDB()
  } catch (error) {
    console.log(error.message)
    process.exitCode = 1
    return // If no database connection can be established there´s no point in starting up the server.
  }

  const PORT = process.env.PORT || 5000
  const directoryFullName = dirname(fileURLToPath(import.meta.url))

  // Create an express application.
  const app = express()

  // ------------------------------------
  //         Middleware section
  // ------------------------------------
  app.use(logger('dev'))

  app.set('view engine', 'hbs')

  // Configurations of the view engine.
  app.engine('hbs', hbs.express4({
    defaultLayout: join(directoryFullName, 'views', 'layouts', 'default'),
    partialsDir: join(directoryFullName, 'views', 'partials')
  }))
  app.set('views', join(directoryFullName, 'views'))

  // Parse requests of the content type application/x-www-form-urlencoded.
  // Populates the request object with a body object (req.body).
  app.use(express.urlencoded({ extended: false }))

  // Serve static files from the public directory.
  app.use(express.static(join(directoryFullName, '..', 'public')))

  // Setup and use session middleware (https://github.com/expressjs/session)
  const sessionOptions = {
    name: 'snippetApp',
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  }

  /*  app.set('trust proxy', 1) */

  app.use(session(sessionOptions))

  app.use(function (req, res, next) {
    if (req.session.flash) {
      res.locals.flash = req.session.flash
      delete req.session.flash
    }

    res.locals.baseURL = '/'
    next()
  })

  // Register routes.
  app.use('/', router)

  // Error handler.
  app.use(function (err, req, res, next) {
    if (err.status === 404) {
      return res
        .status(404)
        .sendFile(join(directoryFullName, 'views', 'errors', '404.html'))
    }
    return res
      .status(500)
      .sendFile(join(directoryFullName, 'views', 'errors', '500.html'))
  })

  // ------------------------------------
  //      End of Middleware section
  // ------------------------------------

  // Starts the HTTP server.
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
}

main()
