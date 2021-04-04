import Questions from './schema/S_questions'
import {testType} from '../helpers/constants'

const getAll = async () => {
    await Questions.find()
}
const getByType = async (type : testType ) => {
    await Questions.find({type})
}

export default {getAll, getByType}