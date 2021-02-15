/**
 * Module for the the PasswordMatchError.
 *
 * @author Alva Persson <ap223st@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Represents the custom error WrongSiteStructureError.
 *
 * @class
 */
export class PasswordMatchError extends Error {
  /**
   * Creates a PasswordMatchError instance.
   */
  constructor () {
    super('Passwords don\'t match.')
    this.name = 'PasswordMatchError'
  }
}
