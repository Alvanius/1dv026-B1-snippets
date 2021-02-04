/**
 * The starting point of the application.
 *
 * @author Alva Persson
 * @version 1.0.0
 */

import { connectDB } from './config/mongoose.js'

/**
 * The main function of  the application.
 */
const main = async () => {
  try {
    await connectDB()
  } catch (error) {
    console.log(error.message)
    process.exitCode = 1
    return
  }
}

main()
