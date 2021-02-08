/**
 * Registration controller.
 *
 * @author Alva Persson
 * @version 1.0.0
 */

import { User } from '../models/user.js'
/**
 * Encapsulates a controller.
 */
export class RegistrationController {
  /**
   * If the posted data is valid and complete for the user to successfully sign-up to the site the user data is saved.
   * On successful registration the user is redirected to the login page where their username is automatically filled in.
   * If registration was unsuccessful an informative flash message is shown and the user stays on the registration page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async registerPost (req, res, next) {
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
      res.render('home/index', { username: req.body.username, links: '<a href="/log-in" id="current">Login</a><a href="/sign-up">Sign-up</a>' })
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
  registerIndex (req, res, next) {
    res.render('registration/index', { links: '<a href="/log-in">Login</a><a href="/sign-up" id="current">Sign-up</a>' })
  }
}
