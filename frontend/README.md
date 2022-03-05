## Quick Start

To start the development, run:

```
git init
yarn install
yarn set-script prepare "husky install" && yarn prepare
```

This should result in cloning the project, 
setting up your repository as origin and pushing the starter as your initial commit. 
The linter and tests will be run, to confirm that everything works properly.

## Environment

This code will be automatically published to heroku 

### Development

The repository contains a .env.dist file with a list of all env variables used in the application.
To use on local environment copy .env.dist to root folder as .env and fill any missing variables (`cp .env.dist .env`)

## Available Scripts

In the project directory, you can run:

### `yarn lint(:fix)`

Runs the linter (and fixes fixable issues)

### `yarn plop`

Runs [Plop JS](https://plopjs.com/) used for generating custom hooks and react components.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn coverage`

Launches the test runner in the coverage report generation mode.<br />
See [this](https://create-react-app.dev/docs/running-tests/#coverage-reporting) section for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
