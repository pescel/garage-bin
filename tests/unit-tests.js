const chai = require('chai')
const expect = chai.expect
const { sortItems } from '../public/index'

describe('Index', () => {

  it('sortItems should sort items by name', () => {
    let items = {
      'bike',
      'rug',
      'car'
    }

    expect(sortItems(items)).to.equal({'bike', 'car', 'rug'})
  });
});
