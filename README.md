# Introduction

Project is based on next.js (refer next.js documentation in case of issues - https://nextjs.org/docs)

It is a React app with SSR support

# Useful urls

- Test coverage: https://unittest.s3.nl-ams.scw.cloud/gtmsfrontend/master/index.html

- Styleguide: https://styleguide.s3.nl-ams.scw.cloud/master/index.html

# Requirements

- Use only `yarn`, please do not use `npm` or any other package manager. This repo is using yarn workspaces feature and yarn is required

# Running the project

### Setting up TypeScript configuration

In the dev mode you can use your own `tsconfig` file. Before starting working on any application in monorepo you have to create `tsconfig.json` file. You can find an example of that file here:

```bash
./packages/app-${APPLICATION_NAME}/tsconfig.json.example
```

just copy file to:

```bash
./packages/app-${APPLICATION_NAME}/tsconfig.json
```

it is good to go, you don't have to make any changes there if default config works for you

Also, if you don't want to do that manually here is a useful command that will do it for you (you just need to run it once, after checking out the project, or when you want to reset ts settings):

```bash
yarn workspaces run setup:ts
```

### Install dependencies

```bash
yarn
```

### Start FAKE API server

```bash
yarn fake-api
```

### Start FAKE API server in watch mode (auto-reload)

```bash
yarn fake-api:watch
```

# MONOREPO STRUCTURE

Inside `packages` dir lie all independent packages. Current structure

- `api-*` - packages responsible for communication with BE
- `commons` - reusable, common code, different purposes
- `styles` - global scss, mixins, variables
- `ui` - common, reusable, simple UI components, without any buissnes logic
- `state-*` - packages to manage apps state
- `app-*` - standalone applications

For most packages code is located in `src` folder but there are exceptions like:

- `commons` or `ui`

if there is no `src` folder inside package it means that you **SHOULD NOT** import directly from that package, for example

```
import { Button } from @gtms/ui
```

**IS NOT CORRECT**, do:

```
import { Button } from @gtms/ui/Button
```

so webpack can do proper tree-shaking and make better prod build

### COMMANDS:

You can run or build only `app-*` packages. To run an app in dev mode (app connected to FAKE-API):

```bash
yarn workspace @gtms/app-${APP_NAME_HERE} dev
```

if you want to use `real` backend, you can use one of 2 QA envs:

- QA master:

```bash
yarn workspace @gtms/app-${APP_NAME_HERE} dev:qa-master
```

- QA stable:

```bash
yarn workspace @gtms/app-${APP_NAME_HERE} dev:qa-stable
```

To create production bundle of an app

```bash
yarn workspace @gtms/app-${APP_NAME_HERE} build
```

To run prod bundle

```bash
yarn workspace @gtms/app-${APP_NAME_HERE} start
```

# Styleguide

As a rule - all components in `@gtms/ui` package should be described and documented in styleguide. To do that create a `md` file next to the `index.tsx` file with your component. And describe **all** possible use cases

To run styleguide localy use:

```bash
yarn styleguide
```

Styleguide is being build per PR, url to it can be find in the list of checks. Please - when you do the code review, please also check styleguide and confirm that the new component looks fine.

Latest Styleguide can be find here: https://styleguide.s3.nl-ams.scw.cloud/master/index.html

# ENVIRONMENT VARIABLES

Some app functionalities like for example social login with Facebook or Google require configuration. In dev mode config is taken from `.env` file. That file is in `.gitignore` but example with list of needed varables can be found in `.env.example`.
Please create your local version of `.env` file in order to have fully working application, running locally in dev mode

# Repository rules (Code Style)

### Code is auto-formatted by prettier, you can use any code style, your commit will be formatted before commiting to the repo

### Use mindful commit message

### Use only Conventional Commits format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

read more here: https://www.conventionalcommits.org/

#### Types:

- `fix`: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in semantic versioning).
- `feat`: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in semantic versioning).
- other allowed: `build`, `chore`, `ci`, `docs`, `style`, `refactor`, `perf`, `test`

### Always `squash` your pull requests

### Put ticket number in your branch name

Branch name has to start with JIRA ticket number, please use format `{ticket-namer}-{short-description}`, like for example `GEOT-1-use-ticket-number-in-branch-name`
The ticket number will be taken later from the branch name and add to your commit messages. This will allow a bunch of automation on top of JIRA and github
There is a pre-commit-message hook which will check the branch name format, and throw an error is the name is incorrect, so please follow the pattern

# Unit tests

Unit tests are mandatory, tests are running with `jest` and `react-testing-library`. Required test coverage is `80%`, but please always try to reach `100%`. Pre-push git hook checks test coverage on modified files, and it's not allowed to push intro origin when required coverage level is not there

You can always check current coverage by using this command:

```bash
yarn test:coverage
```

To run all the tests simple type:

```bash
yarn test
```

To run test cases in watch mode (only on files that you changed, useful during dev process) use:

```bash
yarn test --watch
```

Current test coverage: https://unittest.s3.nl-ams.scw.cloud/gtmsfrontend/master/index.html

Keep the test file next to the file with code. The only exception are pages - as `nextjs` requires to have only pages code in `pages` dir. Tests for pages should be located in `./__test__` - use this folder only for that

### Do not use default exports, only if it is required by next.js (like for pages for example)

### Try to avoid optional props in your components - it makes app logic more complex, and TS likes to complain about it

# FAKE API

Endpoints definitions are located in `.fakeAPI` folder

- Please follow the rule - one file per endpoint

# TRANSLATIONS

Inside your react component please use `useTranslations` hook

```
import { useTranslation } from 'i18n'

const { t } = useTranslation('translationsNamespace')

<label htmlFor="email">{t('form.email')}</label>
```

Translations files are located in `public/locales/:language` folder

Each file there is a translations namespace

In order to have locale subpath added to any url on the page please import `Link` component from `i18n` not directly from `nextjs`

```
import { Link } from 'i18n'
```

The same rule goes for `Router`

```
import { Router } from 'i18n'
```

### Rules

- Use only hook, awoid usage of translations HOC
- Always use a namespace, follow the rule - a namespace per page
- Nest translations inside json file:

```json
{
  "acceptRules": "Akceptuję warunki",
  "submitButton": "Zarejestruj się",
  "header": "Zarejestruj się",
  "subtitle": "Jedziemy bez focha",
  "form": {
    "email": "Email address"
  }
}
```

Later on you can use nested translation like this: `{t('form.email')}`

- if its needed to repeat translation between pages - do it - try to avoid common translations, exceptions are allowed, but should be rare

# Images / static files

Keep all static files in `static`, and only there

this is how you can use static files in css

```javascript
:global(body) {
    margin: 0;
    padding: 0;
    background-image: url('/images/bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
}
```
