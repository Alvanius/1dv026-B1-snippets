/**
 * Registration controller.
 *
 * @author Alva Persson
 * @version 1.0.0
 */

/**
 * Encapsulates a controller.
 */
export class RegistrationController {
  /**
   * Renders a view, based on posted data, and sends
   * the rendered HTML string as an HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  registerPost (req, res, next) {
    console.log('registration submitted')
    console.log('name was: ' + req.body.username)
    // if we want to automatically fill in the user's username use this below:
    res.render('home/index', { username: req.body.username, links: '<a href="/" id="current">Login</a><a href="/register">Register</a>' })
    // if not, just  res.redirect('./')
  }

  /**
   * Renders a view, based on posted data, and sends
   * the rendered HTML string as an HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  registerIndex (req, res, next) {
    res.render('registration/index', { links: '<a href="/">Login</a><a href="/register" id="current">Register</a>' })
  }
}
