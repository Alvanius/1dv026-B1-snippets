/**
 * Registration controller.
 *
 * @author Alva Persson
 * @version 1.0.0
 */

import { Snippet } from '../models/snippet.js'
/**
 * Encapsulates a controller.
 */
export class SnippetsController {
  /**
   * Renders the snippet page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  snippetsIndex (req, res, next) {
    res.render('snippets/index', { links: '<a id="logo" href="/snippets" id="current">Snippets</a><a href="snippets/my-page">My page</a><a href="/log-out">Log out</a>', user: req.session.user })
  }

  /**
   * Renders the snippet page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  mypageIndex (req, res, next) {
    res.render('snippets/mypage', { links: '<a id="logo" href="/snippets">Snippets</a><a href="snippets/my-page" id="current" >My page</a><a href="/log-out">Log out</a>', user: req.session.user })
  }

  /**
   * Renders the snippet page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  newSnippetIndex (req, res, next) {
    res.render('snippets/new', { links: '<a id="logo" href="/snippets">Snippets</a><a href="snippets/my-page" id="current">My page</a><a href="/log-out">Log out</a>', user: req.session.user })
  }

  /**
   * Renders the snippet page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  authenticate (req, res, next) {
    console.log('cookie looks like: ', req.session)
    if (req.session.userIsLoggedIn) {
      console.log('user seems to be logged in: ', req.session.user)
      console.log('userid is: ', req.session.userID)
      next()
    } else {
      console.log('dont believe user is logged in')
      req.session.flash = { type: 'danger', text: 'No access, please log in' }
      res.redirect('..')
      // should I present 404?
    }
  }
}
