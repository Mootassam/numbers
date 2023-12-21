import { IRepositoryOptions } from "./IRepositoryOptions";

export default class MongooseRepository {
  static getCurrentUser(options: IRepositoryOptions) {
    return (options && options.currentUser) || { id: null };
  }
}
