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
  async snippetsIndex (req, res, next) {
    const viewData = {
      snippets: (await Snippet.find({}))
        .map(snippet => ({
          title: snippet.title,
          text: snippet.text
        })),
      user: req.session.user
    }
    res.render('snippets/index', { viewData, active: { snippets: true } })
  }

  /**
   * Renders the snippet page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async mypageIndex (req, res, next) {
    const viewData = {
      snippets: (await Snippet.find({ author: req.session.userID }))
        .map(snippet => ({
          title: snippet.title,
          text: snippet.text
        })),
      user: req.session.user
    }
    res.render('snippets/mypage', { viewData })
  }

  /**
   * Renders the snippet page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  newSnippetIndex (req, res, next) {
    res.render('snippets/new', { active: { new: true }, user: req.session.user })
  }

  /**
   * Renders the snippet page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async createSnippetPost (req, res, next) {
    console.log('here in snippetcreatepost')
    console.log('user id: ', req.session.userID)
    try {
      const snippet = new Snippet({
        author: req.session.userID,
        title: req.body.snippettitle,
        text: req.body.snippettext
      })
      await snippet.save()
      req.session.flash = { type: 'success', text: 'Snippet created!' }
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Could not create snippet' }
      console.log('an error when creating new snippet occured: ', error.message)
      console.log(error)
    } finally {
      res.redirect('./my-page')
    }
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
      res.locals.loggedIn = true
      next()
    } else {
      console.log('dont believe user is logged in')
      req.session.flash = { type: 'danger', text: 'No access, please log in' }
      res.redirect('..')
      // should I present 404?
    }
  }
}
