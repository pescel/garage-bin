const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../server.js')

chai.use(chaiHttp)

describe('Server', () => {
  it('should exist', () => {
    expect(app).to.exist;
  });
});

describe('GET /', function() {
  it('should return a 200 and html', function(done) {
    chai.request(app)
    .get('/')
    .end(function(err, res) {
      if(err) { done(err); }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      done();
    });
  });
});

describe('GET /api/items', () => {
  beforeEach((done) => {
  const items = [{name: 'bug'},
                  {name: 'rug'},
                  {name: 'thug'}]
  app.locals.items = items;
  done();
});

afterEach(function(done){
  app.locals.items = [];
  done();
});

it('should return all garage items', (done)  => {
      chai.request(app)
      .get('/api/items')
      .end((err, res) => {
        if(err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(3);
        expect(res.body[0]).to.have.property('name');
        done();
      });
    });
  });

  it('should return an error if the wrong url is used', () => {
    chai.request(app)
    .get('/api/garage')
    .end(err,res) => {
      if(err) { done(err); }
      expect(res).to.have.status(404);
    }
  })
