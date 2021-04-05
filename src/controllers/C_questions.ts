import {RequestHandler} from 'express-serve-static-core'
import Questions from '../model/M_questions'
import {testType} from '../helpers/constants'

const getAll = (async (req, res, next) => {
    try {
        // const userId = req.user.id
        const data = await Questions.getAll()
        return res.json({
            status: 'success',
            code: 200,
            data,
        })
    } catch (e) {
        next(e)
    }
}) as RequestHandler

const getByType = (async (req, res, next) => {
    
        try {
            const testquery = req.query.test

            if (testquery === testType.QA) {
                const data = await Questions.getByType(testType.QA)
                return res.json({
                    status: 'success',
                    code: 200,
                    data,
                })
            }

            if (testquery === testType.TESTTHEORY) {
                const data = await Questions.getByType(testType.TESTTHEORY)
                return res.json({
                    status: 'success',
                    code: 200,
                    data,
                })
            }

            const data = await Questions.getByType(testType.COMMON)
            return res.json({
                status: 'success',
                code: 200,
                data,
            })

    } catch (e) {
        next(e)
    }
}) as RequestHandler

export default {getByType, getAll}