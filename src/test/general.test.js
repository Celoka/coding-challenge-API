import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import { Event } from '../models';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

const { expect } = chai;

describe('Event test', () => {
  let token = '';
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/users/login')
      .send({
        username: 'Eloka Chima',
        password: 'Asorock!',
        email: 'west_black@gmail.com',
      })
      .end((err, res) => {
        token = res.body.data.token;
        done();
      });
  });
  /**
   * The first and second test cases are unit tests for the event models.
   */
  it('Should request for a validate date', (done) => {
    Event.create({
      name: 'New event!',
      date: '2025-03-14',
      createdBy: 'Default User',
      userId: 2
    })
    .then(() => {
      expect.fail();
      done();
    })
    .catch((err) => {
      expect(err.name).to.be.equal('SequelizeValidationError');
      done();
    });
  });
  it('Should require name field is between 8 and 16 characters', (done) => {
    Event.create({
      name: 'Very long name field that will throw error!',
      date: '2021-03-14',
      createdBy: 'Default User',
      userId: 2,
    })
      .then(() => {
        expect.fail();
        done();
      })
      .catch((err) => {
        expect(err.name).to.be.equal('SequelizeValidationError');
        done();
      });
  });
  it('Should return a users created event', (done) => {
    chai
      .request(app)
      .get('/api/v1/event/all-events')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.eql('Request successful');
        if (err) return done();
        done();
      });
  });

  it('Should require date is not greater than current date', (done) => {
    chai
      .request(app)
      .post('/api/v1/event/create')
      .set('token', token)
      .send({
        name: 'New event!',
        date: '2025-03-14',
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.errors[0]).to.eql(
          'Date cannot be greater than current date'
        );
        if (err) return done();
        done();
      });
  });
  it('Should require name is between 8 and 16 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/event/create')
      .set('token', token)
      .send({
        name: 'S',
        date: '2020-03-14',
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.errors[0]).to.eql(
          'Event name should have a min of 8 and max of 16 characters'
        );
        if (err) return done();
        done();
      });
  });
});
