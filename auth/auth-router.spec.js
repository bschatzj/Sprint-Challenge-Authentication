const db = require('../database/dbConfig');
const request = require('supertest');
const User = require('./authHelpers');
const server = require('./auth-router');
const jokes = require('../jokes/jokes-router');

describe('Users model', () => {
    beforeEach(async () => {

        await db('users').truncate();
    });
    describe('insert function', () => {

    });
    describe('insert', () => {
        it('user in db', async () => {
            const UserNumber = await db('users');
            expect(UserNumber).toHaveLength(0);
            await User.findBy({ username: 'brendan', password: 'isawesome' });
            expect(UserNumber).toHaveLength(0)
        });
    });

    describe('Post /users', function () {
        it('responds with json', function () {
            request(server)
                .post('/register')
                .send({ username: 'brendan', password: 'iscool' })
                .expect('Content-Type', /json/)
        });
    });

    describe('Post /users', function () {
        it('responds with json', function () {
            request(server)
                .post('/login')
                .send({ username: 'brendan', password: 'isthebest' })
                .expect('Content-Type', /json/)
                .expect(201)
        });
    });

    describe('Post /users', function () {
        it('responds with json', function () {
            request(jokes)
                .get('/jokes')
                .expect('status')
                .expect(200)
        });
    });
});