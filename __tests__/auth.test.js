import request from 'supertest';
import { app } from '../index.js';

test('check working', () => {
    expect(true).toBe(true);
})

describe("POST /api/v1/auth/register", () => {

    describe("given name, username and password", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).post('/api/v1/auth/register').send({
                "name": "Radit",
                "email": "radit@gmail.com",
                "password": "abcabc"
            })
            expect(response.statusCode).toBe(200)
        })
    })

    describe("given name, username and password", () => {

    })
})

// test('should register for a user', async () => {
//     await request(app).post('/api/v1/auth/register')
//         .send({
//             name: "Radit",
//             email: "radit@gmail.com",
//             password: "abcabc"
//         })
//         .expect(200)
// })