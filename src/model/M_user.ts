import User from './schema/S_user'
import {IFindUserByValue , TupdateToken, InewUser } from '../types/interfaces'

const findByEmail: IFindUserByValue<string> = async email => {
    return await User.findOne({ email })
}

const findById : IFindUserByValue<string>  = async id => {
    return await User.findOne({ _id: id })
}
const findByToken : IFindUserByValue<string> = async token => {
    return await User.findOne({ token })
}

const create = async ({ name, email, password } : InewUser) => {
    const user = new User({ name, email, password })
    return await user.save()
}

const updateToken: TupdateToken = async (id, token) => {
    return await User.updateOne({ _id: id }, { token })
}

export default {
    findByEmail,
    findById,
    findByToken,
    create,
    updateToken,
}

// const verify = async (req, res, next) => {
//     const id = req.user.id
//     await Users.updateToken(id, null)
//     return res.status(HttpCode.NO_CONTENT).json({})
// }
// const updateAvatar = async (id, avatar, imgIdCloud) => {
//     return await User.updateOne({ _id: id }, { avatar, imgIdCloud })
// }
// const updateVerifyToken = async (id, verify, verifyToken) => {
//     return await User.findOneAndUpdate({ _id: id }, { verify, verifyToken }) // [1]
// }

// const findByVerifyToken: TFindUserByValue<string> = async verifyToken => {
//     return await User.findOne({ verifyToken })
// }
