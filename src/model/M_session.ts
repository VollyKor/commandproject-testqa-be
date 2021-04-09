import Session from './schema/S_sessionId';
import User from './schema/S_user';

const getAllSessions = async (): Promise<any> => {
  const questions = await Session.find({});
  return questions;
};

const logGoogleUser = async email => {
  const isUserRegistered = User.find({ email });

  if (isUserRegistered) {
    const user = User.find({ email });
    return user;
  } else {
    const newUser = User.create({ email });
  }
};

export default { getAllSessions };
