import { Igoogleuser } from '../types/interfaces';
import Session from './schema/S_sessionId';
import User from './schema/S_user';
import GoogleUser from './schema/S_googleUser';

export const createOrUpdateGoogleUser = async (data: Igoogleuser) => {
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

export default { createOrUpdateGoogleUser };
