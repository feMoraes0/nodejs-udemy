import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  dbConnection: MongoClient,

  async connect (uri: string): Promise<void> {
    this.dbConnection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    this.dbConnection.close()
  },

  getCollection (name: string): Collection {
    return this.dbConnection.db().collection(name)
  }
}
