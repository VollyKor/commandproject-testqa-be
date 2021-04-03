import app from '../index'
import { a } from '../controllers/user.js'

console.log(a);

// Connect to Database
// ======================================


// const db = require('../model/db')
// const createFolderIsExist = require('../utils/create-dir')
// const { UPLOAD_FOLDER, AVATARS_OF_USERS } = require('../helpers/constants')

// const PORT = process.env.PORT || 3000

// db.then(() => {
//     app.listen(PORT, async () => {
//         await createFolderIsExist(UPLOAD_FOLDER)
//         await createFolderIsExist(AVATARS_OF_USERS)

//         console.log(`Server running. Use our API on port: ${PORT}`)
//     })
// }).catch(e => {
//     console.log(`Server not running. Error message: ${e.message}`)
//     process.exit(1)
// })
