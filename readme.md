# Configuração do ESLINT 💅

first install **'eslint'** and **'@rocketseat/eslint-config'** like dev dependencie

_@rocketseat/eslint-config it is optional, you can use other pattern_

```npm
npm i eslint @rocketseat/eslint-config -D
```

create an archive .eslintrc.json on the root

extends rocketseat package

```
{
    "extends": [
        "@rocketseat/eslint-config/node"
    ]
}
```

On vscode settings.json add

```
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
},
```

On package.json add a command to fix all possible problems automatically with lint

```
"scripts": {
    ...
    "lint": "eslint src --ext .ts --fix"
  },
```

## Rule of Business, Functional Rules, Not Functional Rules

## FR

- [x] The user should create a transaction.
- [x] The user should can see resume of his account
- [x] The user should list all trasactions realized
- [x] The user should see one transaction

## RB

- [x] The transaction can be of type credit that will sum the value, or debit that will subtract
- [] Should be possible identify user through requisitions
- [] The user just can see transactions created by himself

## NFR
