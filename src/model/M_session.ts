import { IsessionDocument } from '../types/interfaces';
import Session from './schema/S_session';

const create = async (userId: string): Promise<IsessionDocument> => {
  const newSession = await Session.create({ userId });
  newSession.save();
  return newSession;
};

type T = {
  ok?: number;
  n?: number;
} & {
  deletedCount?: number;
};

type F = (sessionId: string) => Promise<T>;

const remove: F = async Id => await Session.deleteOne({ _id: Id });

export { create, remove };
