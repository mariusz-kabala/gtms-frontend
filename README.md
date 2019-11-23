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

# Repository rules
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