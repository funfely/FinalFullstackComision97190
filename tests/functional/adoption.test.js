const request = require('supertest');
const app = require('../../src/app');

describe('Suite de Tests Funcionales Completa - Adoption Router', () => {

    describe('GET /api/adoptions', () => {
        it('Debería responder HTTP 200 y retornar un array de adopciones', async () => {
            const res = await request(app).get('/api/adoptions');
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /api/adoptions/:aid', () => {
        it('Debería responder HTTP 200 si el ID solicitado existe', async () => {
            const res = await request(app).get('/api/adoptions/1');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id', 1);
        });

        it('Debería responder HTTP 404 si el ID no existe en el sistema', async () => {
            const res = await request(app).get('/api/adoptions/999');
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('error');
        });
    });

    describe('POST /api/adoptions', () => {
        it('Debería responder HTTP 201 y retornar la adopción creada si el payload es válido', async () => {
            const payload = { petId: 24, userId: 12 };
            const res = await request(app)
                .post('/api/adoptions')
                .send(payload);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.petId).toBe(24);
        });

        it('Debería responder HTTP 400 si faltan datos obligatorios en el cuerpo', async () => {
            const invalidPayload = { petId: 24 }; // Falta userId
            const res = await request(app)
                .post('/api/adoptions')
                .send(invalidPayload);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error');
        });
    });
});