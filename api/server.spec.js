const request = require('supertest');

const server = require('./server');

it("should return 200", () => {
    return request(server)
        .get('/')
        .then(res => {
            expect(res.status).toBe(200);
        })
});

it("should be json", () => {
    return request(server)
    .get('/')
    .then (res => {
        expect(res.type).toMatch(/json/)
    })
});