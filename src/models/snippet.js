/**
 * Mongoose model Snippet.
 *
 * @author Alva Persson
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const snippetSchema = new mongoose.Schema({
  user: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 1
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  text: {
    type: String,
    required: true
  }
}, { timestamps: true })

export const Snippet = mongoose.model('Snippet', snippetSchema)
