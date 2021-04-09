import { IgoogleUser } from '../types/interfaces';
import GoogleUser from './schema/S_googleUser';

export const createOrUpdateGoogleUser = async (data: IgoogleUser) => {
  const [user] = await GoogleUser.find({ email: data.email });

  if (!user) {
    const newUser = await GoogleUser.create({ ...data });
    await newUser.save();

    return newUser;
  }

  await GoogleUser.updateOne(
    { googleUserId: data.googleUserId },
    {
      ...data,
    },
  );

  const [updatedUser] = await GoogleUser.find({ email: data.email });
  return updatedUser;
};

export const find = id => {
  const user = GoogleUser.findById(id);
  return user;
};

export default { createOrUpdateGoogleUser, find };
