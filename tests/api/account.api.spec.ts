import{test, expect} from '@playwright/test'
import { createUserData, updatedUserData } from '../../utils/api-user-data';


test("API_001 Pełny cykl życia użytkownika przez API", async({request})=>{
    const email = `testemail${Date.now()}@email.com`
    const password = "Testowe123!"
    const userData = createUserData(email, password);
const userUpdatedData = updatedUserData(email, password);

    const response = await request.post('/api/createAccount', {
        form : userData
    })
expect(response.status()).toBe(200)
const body= await response.json()
expect(body.responseCode).toBe(201)
expect(body.message).toBe("User created!")


const loginResponse = await request.post('/api/verifyLogin', {
    form:{
        email,
        password
    }
})
const loginBody = await loginResponse.json();

  expect(loginResponse.status()).toBe(200);
  expect(loginBody.responseCode).toBe(200);
  expect(loginBody.message).toBe("User exists!");

  const responseUpdate = await request.put('/api/updateAccount',{
  form:userUpdatedData
})
expect(responseUpdate.status()).toBe(200)
const bodyUpdate= await responseUpdate.json()
expect(bodyUpdate.responseCode).toBe(200)
expect(bodyUpdate.message).toBe("User updated!")

const responseUserDetails = await request.get('/api/getUserDetailByEmail',{
  params:{
    email
  }
  })
const bodyUserDetails = await responseUserDetails.json()
expect(bodyUserDetails.responseCode).toBe(200)
expect(responseUserDetails.status()).toBe(200)
expect(bodyUserDetails.user.name).toBe(userUpdatedData.name);
expect(bodyUserDetails.user.company).toBe(userUpdatedData.company);
expect(bodyUserDetails.user.title).toBe(userUpdatedData.title);
expect(bodyUserDetails.user.zipcode).toBe(userUpdatedData.zipcode);

  const deleteResponse = await request.delete("/api/deleteAccount", {
    form: {
      email,
      password,
    },
  });

  const deleteBody = await deleteResponse.json();

  expect(deleteResponse.status()).toBe(200);
  expect(deleteBody.responseCode).toBe(200);
  expect(deleteBody.message).toBe("Account deleted!");
})

test('API_002 Logowanie bez podania hasła', async({request})=>{
  const response = await request.post('/api/verifyLogin', {
    form :{
      email:`testowy${Date.now()}@email.com`
    }
  })

 const body = await response.json();
  expect(response.status()).toBe(200)
  expect(body.responseCode).toBe(400);
  expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
})
test('API_003 Logowanie złym hasłem', async ({request})=>{
const response = await request.post('/api/verifyLogin', {
  form:{
      email:'testowy@test.com',
      password:'BadPass123'
  }
  
})
const body = await response.json()
expect(response.status()).toBe(200)
expect(body.responseCode).toBe(404)
expect(body.message).toBe('User not found!')

})

