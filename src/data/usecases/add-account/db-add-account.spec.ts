import { DbAddAccount } from './db-add-account'

class EncrypterStub {
  async encrypt (value: string): Promise<string> {
    return await new Promise(resolve => resolve('hashed_password'))
  }
}

interface SutTypes {
  encrypterStub: EncrypterStub
  sut: DbAddAccount
}

const makeSut = (): SutTypes => {
  const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccount(encrypterStub)

  return { sut, encrypterStub }
}

describe('DBAddAccount Usecase', () => {
  test('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
