# Node.js - New Project Guide

Guide for setting up a new Node.js projects

## Version Management

- Use Node.js v20 or alternative LTS (long-term support) versions
- Install `nvm` to manage node.js version
- Run `nvm use 20` to switch to node.js version 20
- Add `.nvmrc` file to every project and include `20` to set node.js version
- Run `nvm use` to read version from `.nvmrc` file and switch to respective version

## Do once

- Install `prettier` globally for automatic code formatting on file save

## For every new project

- Create a new folder for every new project
- Create a new git repo on GitHub. Run `git init` to initialize repo locally.
- Init node.js project by `npm init -y` to create `package.json` file
- Install `npm i dotenv` locally to read variables from `.env` file

### Project Directory Structure

Create:

- `README.md`
- `modules` folder that includes all files for project
- `output` folder for saving any type of logging files during development, e.g. caching OpenAI responses, writing log files, etc.
- `modules/helpers.js` file that includes any type of generic helper functions, such as writing stuff to files (`toFile(...)`), de/compression, command-line confirm, etc
- `config/index.js` file that includes all the configuration variables for the project, such as API keys, URLs, etc.
- `.env` file to store all the environment variables, such as API keys, URLs, etc.
- `.gitignore` file to ignore `node_modules`, `.env`, and other files that should not be pushed to GitHub
- `.nvmrc` file to specify the node.js version for the project

**Structure:**

```
project-name
├── .gitignore
├── .nvmrc
├── .env
├── README.md
├──  modules
│   ├── helpers.js
│   ├── module-name1.js
│   └── module-name2.js
├──  output
│   ├── log.txt
│   └── cache.json
├──  package.json
├──  package-lock.json
├──  node_modules
```

## Other Stuff

- Use UUIDs to create unique IDs
- Use Docker for databases and other services (eg PostgreSQL, ElasticSearch, Redis, etc.)

## VS Code

Setup VSCode to run files in terminal on `cmd + enter`:

- Open the Command Palette (Command + Shift + P) and type "Preferences: Open Keyboard Shortcuts (JSON)". Select it.
- Add:

```json
{
  "key": "shift+enter",
  "command": "workbench.action.terminal.sendSequence",
  "args": {
    "text": "node ${file}\u000D"
  },
  "when": "resourceExtname == .js || resourceExtname == .mjs"
}
```
