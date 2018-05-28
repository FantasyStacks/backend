//import log from 'ololog'

describe('Test createUser', () => {
  test('Should create a new item in the database with valid input', async () => {
    expect(true).toBeTruthy() 
  })

  test('Should not create a user if email is not valid', async () => {
  })

  test('Usernames should be unique', async () => {
  })

  test('Passwords should be hashed', async () => {
  })
})

describe('Test getUser', () => {
  test('Should get user from database', async () => {
  })
});

describe('Test verifyPassword', async () => {
  test('correct password should return a truthy value', async () => {
  });

  test('incorrect password should return a falsy value', async () => {
  });
});

describe('Test VerifyLogin', async () => {
  test('correct signin info should return the user', async () => {
  });

  test('incorrect username should throw an error', async () => {
  })

  test('incorrect password should throw an error', async () => {
  })
})

