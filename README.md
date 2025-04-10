# Node.js - New Project Guide

## Version Management

- Use Node.js v20 or alternative LTS (long-term support) versions
- Install `nvm` to manage node.js version
- Run `nvm use 20` to switch to node.js version 20
- Add `.nvmrc` file to every project and include `20` to set node.js version
- Run `nvm use` to read version from `.nvmrc` file and switch to respective version

## Generic

- Install `prettier` globally for automatic code formatting on file save
- Install `dotenv` locally to read variables from `.env` file

## Project Directory Structure

- Create `README.md` for every project
- Create `modules` folder that includes all files for project
- Create `output` folder for saving any type of logging files during development, e.g. caching OpenAI responses, writing log files, etc.
- Create `modules/helpers.js` file that includes any type of generic helper functions, such as writing stuff to files (`toFile(...)`), de/compression, command-line confirm, etc

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
