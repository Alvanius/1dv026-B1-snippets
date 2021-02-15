/**
 * Mongoose model Snippet.
 *
 * @author Alva Persson
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const snippetSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
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
    required: true,
    minlength: 1
  }
}, { timestamps: true })

export const Snippet = mongoose.model('Snippet', snippetSchema)
