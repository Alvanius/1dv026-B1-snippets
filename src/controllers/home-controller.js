/**
 * Home controller.
 *
 * @author Alva Persson
 * @version 1.0.0
 */

import { User } from '../models/user.js'

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Renders the start page with a login form.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    res.render('home/index', { links: '<a href="/#" id="logo" id="current">Home</a><a href="/browse-snippets">Snippets</a><a href="/sign-up">Sign-up</a>' })
  }

  /**
   * Renders a view, based on posted data, and sends
   * the rendered HTML string as an HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async loginPost (req, res, next) {
    try {
      const user = await User.authenticate(req.body.username, req.body.password)
      console.log('user is authenticated')
      req.session.regenerate(() => {
        req.session.user = user.username
        req.session.userID = user._id
        req.session.userIsLoggedIn = true
        res.redirect('./snippets')
      })
    } catch (error) {
      console.log('something went wrong logging in: ', error.message)
      req.session.flash = { type: 'danger', text: 'Could not log in' }
      res.redirect('./')
    }
  }

  /**
   * If the posted data is valid and complete for the user to successfully sign-up to the site the user data is saved.
   * On successful registration the user is redirected to the login page where their username is automatically filled in.
   * If registration was unsuccessful an informative flash message is shown and the user stays on the registration page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async signupPost (req, res, next) {
    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      await user.save()
      req.session.flash = { type: 'success', text: `Registration completed, welcome ${req.body.username}` }
      // if we want to automatically fill in the user's username use this below:
      /* res.render('home/index', { username: req.body.username, links: '<a href="/#" id="logo">Home</a><a href="/browse-snippets" id="current">Snippets</a><a href="/sign-up">Sign up</a>' }) */
      // if not, just
      res.redirect('./')
    } catch (error) {
      console.log('ERROR something went wrong on registration ' + error.message)
      req.session.flash = { type: 'danger', text: 'Registration failed, please try again' }
      res.redirect('./sign-up')
    }
  }

  /**
   * Renders the registration page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  signupIndex (req, res, next) {
    res.render('home/signup', { links: '<a href="/#" id="logo">Home</a><a href="/browse-snippets">Snippets</a><a href="/sign-up" id="current">Sign up</a>' })
  }

  /**
   * Renders the home page after logging out.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  logout (req, res, next) {
    req.session.destroy(() => {
      res.render('home/index', { links: '<a href="/#" id="logo" id="current">Home</a><a href="/browse-snippets">Snippets</a><a href="/sign-up">Sign up</a>' })
    })
  }

  /**
   * Renders the home page after logging out.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  guestSnippetsIndex (req, res, next) {
    // make sure session is ended beforew reaching this point
    res.render('home/browsesnippets', { links: '<a href="/#" id="logo">Home</a><a id="current" href="/browse-snippets" id="current">Snippets</a><a href="/sign-up">Sign up</a>' })
  }
}
