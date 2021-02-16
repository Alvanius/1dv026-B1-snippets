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
   * Renders the snippet page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async viewSnippetIndex (req, res, next) {
    const id = req.url.substring(1)
    const snippet = await Snippet.find({ _id: id })
    const snippetAuthor = await User.find({ _id: snippet[0].author })
    const viewData = {
      snippet: snippet
        .map(snippet => ({
          title: snippet.title,
          text: snippet.text
        }))
    }

    let mybool = false

    if (req.session.userIsLoggedIn) {
      res.locals.loggedIn = true

      if (snippet[0].author === req.session.userID) {
        console.log('the snippet creator is opening this snippet!')
        res.locals.snippetOwner = true
        mybool = true
      }
    }

    const info = {
      author: snippetAuthor[0].username,
      status: mybool
    }

    // check if user is author/owner and then also add posibility to edit and delete
    res.render('snippet/index', { viewData, info, id: id })
  }
}
