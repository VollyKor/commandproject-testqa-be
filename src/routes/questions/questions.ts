import express from 'express'
import Questions from '../../controllers/C_questions'

// =================================================
// import { testType } from '../../helpers/constants'
// import QN from '../../model/schema/S_questions'

const router = express.Router()
// // const validateContact = require('./validate')
// const guard = require('../../../helpers/guard')

router
    .get('/', Questions.getAll)
  
// Route for change data in db to right format
// ==========================================================
// router.post('/mod', async(req, res, next) => {
//     try {
// //     const newqns = await QN.find({type: {$ne: testType.QA}})
// // console.log(newqns);
// // await QN.updateMany({  }, { "$set": { type: testType.QA } }, {"multi": true})
// // await QN.updateMany({ type: { $ne: testType.QA } }, { "$set": { type: testType.TESTTHEORY } }, {"multi": true})
//     // console.log(questions);

//     // for (let i = 0; i < questions.length; i++) {
//     //     const element = questions[i];
//     //     const qn = await QN.updateMany(element.id)

//     // }

//     // const modArr = questions.map(e => e.type = testType.QA)
//     res.json({ message: 'success'})
    
// } catch (error) {
//     console.log(error.message);
//     res.json({error: error.message})
    
// }
// })    
// router
//     .get('/:contactId', guard, Questions.getById)
//     .delete('/:contactId', guard, Questions.remove)
//     .patch('/:contactId', guard, validateContact.UpdateContact, Questions.update)

export default router
