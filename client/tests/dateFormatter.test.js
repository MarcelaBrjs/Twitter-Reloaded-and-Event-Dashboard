const { headerDateFormater } = require('../src/helpers/dateFormatter');

test('date header is correctly formatted', () => {
  expect(headerDateFormater("2022-12-02T07:45:51.486Z")).toEqual({"date": "Friday, December 2, 2022"});
});