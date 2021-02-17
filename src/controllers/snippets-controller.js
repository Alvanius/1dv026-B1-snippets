/**
 * Snippets controller.
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
          text: snippet.text,
          id: snippet._id
        })),
      user: req.session.user
    }
    res.render('snippets/index', { viewData, active: { snippets: true } })
  }

  /**
   * Renders the user's home page.
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
          text: snippet.text,
          id: snippet._id
        })),
      user: req.session.user
    }
    res.render('snippets/mypage', { viewData })
  }

  /**
   * Renders the new snippet page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  newSnippetIndex (req, res, next) {
    res.render('snippets/new', { active: { new: true }, user: req.session.user })
  }

  /**
   * Called when a new snippet is submitted.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async createSnippetPost (req, res, next) {
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
    } finally {
      res.redirect('./my-page')
    }
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
      // this works but shows the /snippets/log-out url
      /* res.locals.loggedIn = false
      res.locals.flash = { type: 'success', text: 'You successfully logged out.' }
      res.render('home/index') */
      // this works and shows the root url but can't send along a flash message
      res.redirect('..')
    })
  }

  /**
   * Called to authenticate the user, and render 404 if they're not logged in.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  authenticate (req, res, next) {
    if (req.session.userIsLoggedIn) {
      res.locals.loggedIn = true
      next()
    } else {
      const error = new Error()
      error.status = 404
      next(error)
    }
  }
}
