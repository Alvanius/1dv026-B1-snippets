/**
 * View snippets controller.
 *
 * @author Alva Persson
 * @version 1.0.0
 */

import { Snippet } from '../models/snippet.js'
import { User } from '../models/user.js'
/**
 * Encapsulates a controller.
 */
export class ViewSnippetController {
  /**
   * Renders the view of one specific snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async snippetIndex (req, res, next) {
    try {
      const snippet = await Snippet.findOne({ _id: req.params.id })
      if (req.session.userIsLoggedIn) {
        res.locals.loggedIn = true
        // check if user is author/owner and then also add possibility to edit and delete snippet in view
        if (snippet.author === req.session.userID) {
          res.locals.snippetOwner = true
        }
      }
      const viewData = {
        title: snippet.title,
        text: snippet.text,
        id: snippet._id
      }
      res.render('snippet/index', { viewData })
    } catch (error) {
      const myerror = new Error()
      myerror.status = 404
      next(myerror)
    }
  }

  /**
   * Renders the edit snippet page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async edit (req, res, next) {
    const snippet = await Snippet.findOne({ _id: req.params.id })
    const viewData = {
      title: snippet.title,
      text: snippet.text,
      id: snippet._id
    }
    res.render('snippet/edit', { viewData })
  }

  /**
   * Called to update a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async update (req, res, next) {
    try {
      const result = await Snippet.updateOne({ _id: req.body.id }, {
        title: req.body.snippettitle,
        text: req.body.snippettext
      })
      if (result.nModified === 1) {
        req.session.flash = { type: 'success', text: 'Success! The snippet was updated.' }
      } else {
        req.session.flash = {
          type: 'danger',
          text: 'The snippet you attempted to edit seems to have been removed.'
        }
      }
      res.redirect('/snippets/my-page')
    } catch (error) {
      req.session.flash = {
        type: 'danger',
        text: 'Something went wrong updating, please re-try.'
      }
      res.redirect(`/snippet/${req.params.id}/edit`)
    }
  }

  /**
   * Renders the remove snippet page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  remove (req, res, next) {
  }

  /**
   * Called to remove a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  delete (req, res, next) {
  }
}
