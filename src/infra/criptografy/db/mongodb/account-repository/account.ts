import { AddAccountRepository } from '../../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../../domain/models/account'
import { AddAccountModel } from '../../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

// repositório deve receber os dados e adaptar esses dados baseado nas regras de negócio
// as regras nunca se adaptam ao que é utilizado
export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const operationResult = await accountCollection.insertOne(accountData)
    const { _id, ...accountWithoutId } = operationResult.ops[0]
    const account = Object.assign({}, accountWithoutId, { id: _id })
    return account
  }
}
