```javascript
const zapier = require('zapier-platform-core');

const authentication = require('./authentication');
const triggers = require('./triggers');
const actions = require('./actions');
const searches = require('./searches');

const App = {
  version: require('./package.json').version,
  platformVersion: zapier.version,
  authentication: authentication,
  beforeRequest: [
    (request, z, bundle) => {
      if (bundle.authData.accessToken) {
        request.headers.Authorization = `Bearer ${bundle.authData.accessToken}`;
      }
      return request;
    },
  ],
  afterResponse: [
    (response, z, bundle) => {
      if (response.status === 401) {
        throw new z.errors.RefreshAuthError();
      }
      return response;
    },
  ],
  resources: {},
  triggers: triggers,
  actions: actions,
  searches: searches,
  beforeMiddlewares: [],
  afterMiddlewares: [],
};

module.exports = App;
```

Please note that this is a basic structure of a Zapier CLI application. The actual implementation of `authentication`, `triggers`, `actions`, and `searches` would be in their respective files (authentication.js, triggers.js, actions.js, searches.js) and they are imported in the main index.js file. The actual implementation would depend on the specific requirements and APIs of the integrated services like Zendesk, Intercom, Slack, Salesforce Service Cloud, and social media platforms.