import User from './schema/S_user'
import {IFindUserByValue , TupdateToken, InewUser } from '../types/interfaces'

const findByEmail: IFindUserByValue<string> = async email => {
    const findedUser = await User.findOne({ email })
    return findedUser
}

const findById: IFindUserByValue<string> = async id => {
        const findedUser = await User.findOne({ _id: id })
     return findedUser
}
const findByToken: IFindUserByValue<string> = async token => {
    const findedUser = await User.findOne({ token })
    return findedUser
}

const create = async ({ name, email, password } : InewUser) => {
    const user = new User({ name, email, password })
    const savedUser = await user.save()
    return savedUser
}

const updateToken: TupdateToken = async (id, token) => {
    const uppdatedUser = await User.updateOne({ _id: id }, { token })
    return uppdatedUser
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
