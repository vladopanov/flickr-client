# flickr-client

It is very simple to start the app locally (http://localhost:3000/), just in 2 steps (I hate projects for which you need weeks in order to just even start coding):
1. From the root directory of the project run 'npm install' or 'yarn' in order to install the node packages. Of course you should have Node installed.
2. Start the project by entering 'npm start' or 'yarn start'.

Generally, the starting point is index.tsx in /src. There we have an App() instance which starts all the dependencies (services and stores). The app is built under React and TypeScript by using MobX (https://mobx.js.org) as a state management solution.