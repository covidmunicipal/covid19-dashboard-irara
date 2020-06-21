# Plataforma de acompanhamento

## Configurando

Clone o repositório para um diretório da sua preferência.

O projeto requer o [Node.js](https://nodejs.org) v10 ou posterior.

Instale o CLI do Ionic:

    npm install -g @ionic/cli

Navegue para a pasta `dashboard/` do projeto.

    cd dashboard

Instale as dependências do projeto:

    npm install

## Executando no navegador

Dentro da pasta `dashboard/` do repositório, execute:

    ionic serve

Uma página abrirá no navegador padrão com o app.

## Implantando uma nova versão

Para implantar uma nova versão no Firebase, certifique-se de que o último commit satisfaz aos testes.

Primeiro, altere o atributo `version` no arquivo `package.json` com o novo número de versão e realize commit desta alteração normalmente.

Depois, execute no terminal, substituindo o `X.X.X` pelo número de versão.

    git tag -a vX.X.X -m "Implanta versão X.X.X"
    git push --tags

O deploy será feito automaticamente para o projeto `covid19-municipal` (covid.riso.dev) no Firebase.