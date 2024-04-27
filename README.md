# Netro Creative Task

## Features

- [x] Admin and User authentication.
- [x] Admin and User update own profile.
- [x] Admin can update user by id.
- [x] Admin can delete user by id.
- [x] Admin can request get all users.

## Technologies

- [x] Node.js
- [x] Express.js
- [x] MongoDB

## Some Packages

- [x] jsonwebtoken - to validate authentication
- [x] bcryptjs - to convert password to hash password
- [x] Zod - to validate request
- [x] express-rate-limit - to limti request
- [x] winston - server logs
- [x] multer - upload file image
- [x] http-status - for http code
- [x] morgan - for logs in console which api hits

## How you will run this application to your machine?

1. Check that, you have install `Node.js` on your machine.
2. Clone the `main` branch of repository or download the code as zip and extract code.
3. Open `command prompt` on the specific folder and run command `yarn` or `npm i`
4. Create a file name `.env` and copy all from `.env.example` then place the mongodb uri and other token as required.
5. All set, now run `command prompt` this command `yarn dev` or `npm run dev`
6. Additional, use `better comment` extention to read comments 

## Logs Note

- Server related all errors, sucess, info will be stored on logs folder
- Global error handler error will be store when application on `Production` mode

## Prevent any bad actors from using brute force attack or sql injection

- I have used `express-rate-limit` package for a specific ip to request maximum time in a specific time limit.
- When we request a api, in `Header` we can see `maximum rate limit` and `remaining rate limit`.
- After hitting maxium hit on api, if again  hit on api it will show an customize respone messege.
- And, used `zod` validation to validate request.

## API's

1. User Register

```bash
http://localhost:6001/api/v1/auth/register
```

- name, email and password field are required for user registraion
- the default role will be set automatically to user.

```bash
{
    "name": "User",
    "email": "user@gmail.com",
    "password": "abcabc"
}
```

2. Admin Register

```bash
http://localhost:6001/api/v1/auth/register
```

- name, email and password field are required for user registraion
- role must be set to user.

```bash
{
    "name": "Admin",
    "email": "admin@gmail.com",
    "password": "abcabc",
    "role": "admin"
}
```

3. Admin Signin

```bash
http://localhost:6001/api/v1/auth/signin
```

- You can login by sending json data like this and in respone you will retrive user data and some other stuff. There will be a message which will show login success as admin or user!

```bash
{
    "email": "admin@gmail.com",
    "password": "abcabc"
}
```

4. User Signin

```bash
http://localhost:6001/api/v1/auth/signin
```

- You can login by sending json data like this and in respone you will retrive user data and some other stuff. There will be a message which will show login success as admin or user!

```bash
{
    "email": "user@gmail.com",
    "password": "abcabc"
}
```

5. Update User Profile

```bash
http://localhost:6001/api/v1/user/update
```

- By auth middleware verifing token and set in request the token data
- form token data getting user id and by that user id updating user profile data
- must add authroization token of a user
- on update profile can not update role as requirement 2(1)
- below is just and example, please follow the postman documentation

```bash
data = {"name": "User", "adress": "ngn", "phoneNumber": "01689201370"}
image = /C:/Users/Asus/Desktop/When-should-I-use-PNG-or-JPG.jpg
```

6. Update Admin Profile

```bash
http://localhost:6001/api/v1/admin/update
```

- By auth middleware verifing token and set in request the token data
- form token data getting admin id and by that admin id updating admin profile data
must add authroization token of a admin
- on update profile can not update role as requirement 2(1)
- below is just and example, please follow the postman documentation

```bash
data = {"name": "Admin", "adress": "ngn", "phoneNumber": "01689201370"}
image = /C:/Users/Asus/Desktop/When-should-I-use-PNG-or-JPG.jpg
```

7. Update User By Id (Admin)

```bash
http://localhost:6001/api/v1/admin/update-user/662abd31306eaf39bcfc34ca
```

- only admin can access this url
- taking user id from url param
- must add authroization token of a admin
- below is just and example, please follow the postman documentation

```bash
data = {"name": "Tanvir Islam", "adress": "ngn", "phoneNumber": "01689201370", "role": "user"}
image = /C:/Users/Asus/Desktop/Professional/circle-pp (1).png
```

8. Get all users (Admin)

```bash
http://localhost:6001/api/v1/admin/users
```

- Get all users with admin authentication

9. Delete User By Id (Admin)

```bash
http://localhost:6001/api/v1/admin/delete/662c20c95a1ee78aab522ea9
```

- Delete user with a user id and admin authentication
