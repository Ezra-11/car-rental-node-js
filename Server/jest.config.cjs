module.exports = {
  testEnvironment: "node",
  transform: {}
};
//

// jest.config.js
export default {
  testEnvironment: "node",
  roots: ["<rootDir>serer/tests"],
  testMatch: ["/*.test.js"],
  moduleFileExtensions: ["js", "json"],
  transform: {}
};