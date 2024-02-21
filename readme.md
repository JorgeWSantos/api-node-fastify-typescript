# Configuração do ESLINT

first install **'eslint'** and **'@rocketseat/eslint-config'** like dev dependencie


_@rocketseat/eslint-config it is optional, you can use other pattern_

~~~npm
npm i eslint @rocketseat/eslint-config -D
~~~

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