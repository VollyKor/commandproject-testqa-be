import { IsessionDocument } from '../types/interfaces';
import Session from './schema/S_session';

const create = async (userId: string): Promise<IsessionDocument> => {
  const newSession = await Session.create({ userId });
  newSession.save();
  return newSession;
};

const remove = async (sessionId: string): Promise<boolean> => {
  try {
    await Session.remove({ _id: sessionId });
    return true;
  } catch (error) {
    console.log(error);
  }
};

export { create, remove };
