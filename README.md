# Introduction

Project is based on next.js (refer next.js documentation in case of issues - https://nextjs.org/docs)

It is a React app with SSR support

# Requirements

- Use only `npm`, please do not use `yarn` or any other package manager. Do not commit `yarn.lock` into repo

# Running the project

### Install dependencies

```bash
npm i
```

### Start DEV Environment

```bash
npm run start
```

### Start FAKE API server

```bash
npm run fake-api
```

### Start FAKE API server in watch mode (auto-reload)

```bash
npm run fake-api:watch
```

### Build production bundle

```bash
npm run build
```

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
npm run test:coverage
```

To run all the tests simple type:

```bash
npm t
```

To run test cases in watch mode (only on files that you changed, useful during dev process) use:

```bash
npm t -- --watch
```

# Import aliases

Please do not use relative imports in case if folder has an alias, aliases are defined in `next.config.js`, `tsconfig.json` and `jest.config.js` - REMEMBER: those files need to be updated in order to add a new alias

### Current list of aliases:

- `providers` => `./providers`
- `api` => `./api`
- `helpers` => `./helpers`
- `state` => `./state`
- `i18n` => `./i18n`
- `hooks` => `./hooks`
- `server` => `./server`
- `scss` => `./scss`
- `components` => `./components`

### Bad import example:

```javascript
import { fetchJSON } from '../../api'
```

### Good import example:

```javascript
import { fetchJSON } from 'api'
```

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

Translations files are located in `static/locales/:language` folder

Each file there is a translations namespace

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
    background-image: url('/static/bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
}
```
