// Setup fetch for Jest testing
global.fetch = require('node-fetch');

// Setup the base url for API endpoint
window.BASE_URL =
  // 'https://app.insightfinder.com'; // Prod 
  // 'https://insightfinderstaging.appspot.com'; // staging 
  'http://if-local:8080'; // Local
// 'https://insightfindertesting.appspot.com'; // staging
// 'https://insightfinderui.appspot.com'; // Test 

global.userGuest = {
  userName: 'guest',
  token: '129cd18b1a427e37794ac6ee42077d8b81bb731d',
};

global.userAdmin = {
  userName: 'admin',
  token: '129cd18b1a427e37794ac6ee42077d8b81bb731d',
};

global.userBad = {
  userName: 'guest',
  token: '123456',
};
