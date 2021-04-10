import User from './schema/S_user';
import { TfindUserByValue, TcreateUser } from '../types/interfaces';

const findByEmail: TfindUserByValue = async email => {
  const user = await User.findOne({ email });
  return user;
};

const findById: TfindUserByValue = async _id => {
  const findedUser = await User.findById(_id);
  return findedUser;
};

const create: TcreateUser = async ({ name, email, password }) => {
  const user = new User({ name, email, password });
  const savedUser = await user.save();
  return savedUser;
};

export default {
  findByEmail,
  findById,
  create,
};

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
