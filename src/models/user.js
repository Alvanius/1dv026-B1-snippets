/**
 * Mongoose model User.
 *
 * @author Alva Persson
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 40
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000
  }
}, { timestamps: true, versionKey: false })

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

/**
 * Method for authentication.
 *
 * @param {string} username - The username.
 * @param {string} password - The password.
 * @returns {User} - The authenticated user.
 */
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid login attempt.')
  }

  return user
}

export const User = mongoose.model('User', userSchema)
