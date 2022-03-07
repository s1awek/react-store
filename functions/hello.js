/** @format */
const test = [
  { id: 1, test: 'test' },
  { id: 2, test: 'test2' },
];
exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(test),
  };
};
