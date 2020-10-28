const supertest = require("supertest")
const chai = require("chai")
const app = require('../App');
const expect = chai.expect;

describe('/apps', () => {
    it('should return a list of apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
            });
    })

    it('should sort the list of apps', () => {
        return supertest(app)
            .get('/apps?sort=Rating')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                const first = res.body[0].Rating
                const second = res.body[1].Rating
                expect(first).to.be.most(second);
            })
    })

    it('should filter the list of apps', () => {
        return supertest(app)
            .get('/apps?genres=Action')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                const first = res.body[0].Genres
                const second = "Action"
                expect(first).to.contain(second);
            })
    })

});