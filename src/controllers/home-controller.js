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
    res.render('home/index', { links: '<a href="/sign-up">Sign-up</a>' })
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
    } catch (error) {
      console.log('something went wrong logging in: ', error.message)
    }

    res.redirect('./')
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
    } catch (error) {
      console.log('ERROR something went wrong on registration ' + error.message)
    } finally {
      // if we want to automatically fill in the user's username use this below:
      res.render('/', { username: req.body.username, links: '<a href="/sign-up">Sign up</a>' })
      // if not, just  res.redirect('./')
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
    res.render('home/signup', { links: '<a href="/sign-up" id="current">Sign up</a>' })
  }
}
