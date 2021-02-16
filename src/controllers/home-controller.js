/**
 * Home controller.
 *
 * @author Alva Persson
 * @version 1.0.0
 */

import { User } from '../models/user.js'
import { PasswordMatchError } from '../passwordMatchError.js'

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
        res.redirect('./snippets/my-page')
      })
    } catch (error) {
      console.log('something went wrong logging in: ', error.message)
      req.session.flash = { type: 'danger', text: 'Could not log in' }
      res.redirect('./')
      // Separate wrong credentials from other errors maybe?
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
      if (req.body.password !== req.body.confirmpassword) {
        throw new PasswordMatchError()
      }
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      await user.save()
      res.locals.flash = { type: 'success', text: 'Success! Registration completed.' }
      // if we want to automatically fill in the user's username use this below:
      res.render('home/index', { username: req.body.username })
      // if not, just res.redirect('./')
    } catch (error) {
      let infoMessage = 'Registration failed, please try again'
      if (error.code === 11000) {
        infoMessage = `The username ${error.keyValue.username} is already taken. Think of something more original and try again!`
      } else if (error instanceof PasswordMatchError) {
        infoMessage = error.message + ' Try again.'
      }
      console.log('ERROR something went wrong on registration ' + error.message)
      res.locals.flash = { type: 'danger', text: infoMessage }

      const data = {
        name: req.body.username,
        email: req.body.email,
        pwd: req.body.password,
        confirmpwd: req.body.confirmpassword
      }
      res.render('home/signup', { data, active: { signup: true } })
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
    res.render('home/signup', { active: { signup: true } })
  }

  /**
   * Renders the home page after logging out.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  guestSnippetsIndex (req, res, next) {
    /* res.locals.active = { browse: true} */
    res.render('home/browsesnippets', { active: { browse: true } })
  }
}
