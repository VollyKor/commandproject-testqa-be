import Questions from './schema/S_questions'
import {testType} from '../helpers/constants'

const getAll = async () => {
    const questions = await Questions.find()
    return questions
}
  
const getByType = async (type : testType ) => {
    const questions = await Questions.find({ type })
    return questions
}

export default {getAll, getByType}