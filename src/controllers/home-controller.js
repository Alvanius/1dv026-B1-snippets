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
    res.render('home/index', { links: '<a href="/" id="current">Login</a><a href="/register">Register</a>' })
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
}
