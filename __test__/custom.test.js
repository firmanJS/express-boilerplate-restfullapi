const { convertDate } = require('../utils')

/* eslint-disable no-undef */
describe('all utils custom testing ', () => {
  it('convertdate', () => {
    const getDate = convertDate({})
    expect(convertDate({})).toHaveProperty('createdAt', getDate.createdAt)
    expect(convertDate({})).toHaveProperty('updatedAt', getDate.updatedAt)
  })
})
