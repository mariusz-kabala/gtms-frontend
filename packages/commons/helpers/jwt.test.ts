import { parseJwt } from './jwt'

describe('JWT helper', () => {
  it('Should parse JTW', () => {
    expect(
      parseJwt(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3VudHJ5Q29kZSI6IlBMIiwiZW1haWwiOiJtYXJpdXN6QGthYmFsYS53YXcucGwiLCJpZCI6IjVjZGZiNmE2YmFkODhiYjVkYmYxZWNjZiIsImxhbmd1YWdlQ29kZSI6InBsLVBMIiwicm9sZXMiOltdLCJpYXQiOjE1NzUwMzA2OTgsImV4cCI6MTU3NTAzMTU5OH0.L7KVbpbzJSRo6xt1rqyYzdL7RLS_ZrwSV9R_sO5aZuA'
      )
    ).toEqual({
      countryCode: 'PL',
      email: 'mariusz@kabala.waw.pl',
      id: '5cdfb6a6bad88bb5dbf1eccf',
      languageCode: 'pl-PL',
      roles: [],
      iat: 1575030698,
      exp: 1575031598,
    })
  })
})
