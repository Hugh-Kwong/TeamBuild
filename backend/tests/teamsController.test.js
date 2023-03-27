const request = require('supertest');
const app = require('../testserver');
const mongoose = require('mongoose');
const { teamModel } = require('../models/teamModel');
const { getTeams, setTeam, updateTeam, deleteTeam } = require('../controllers/teamsController');

describe('teamsController', () => {
  /* 
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }); 

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await teamModel.deleteMany();
  });
*/
  describe('getTeams', () => {
    test('should return an array of teams', async () => {
      const team = await teamModel.create({ team: 'Test Team' });
      const res = await request(app).get('/teams');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ team: 'Test Team' })]));
    });
  });

  describe('setTeam', () => {
    test('should create a new team', async () => {
      const res = await request(app).post('/teams').send({ team: 'Test Team' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.team).toEqual('Test Team');
    });

    test('should return an error if team is not provided', async () => {
      const res = await request(app).post('/teams');
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Please add a team');
    });
  });

  describe('updateTeam', () => {
    test('should update an existing team', async () => {
      const team = await teamModel.create({ team: 'Test Team' });
      const res = await request(app).put(`/teams/${team._id}`).send({ team: 'New Test Team' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.team).toEqual('New Test Team');
    });

    test('should return an error if team is not found', async () => {
      const res = await request(app).put('/teams/invalid-id').send({ team: 'New Test Team' });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Team not found');
    });
  });

  describe('deleteTeam', () => {
    test('should delete an existing team', async () => {
      const team = await teamModel.create({ team: 'Test Team' });
      const res = await request(app).delete(`/teams/${team._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.team).toEqual('Test Team');
    });

    test('should return an error if team is not found', async () => {
      const res = await request(app).delete('/teams/invalid-id');
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('Team not found');
    });
  });
});
