## Script de exportação do Google Sheets para Firebase

É um script para o [Google Apps Script](http://script.google.com/) que exporta os dados de uma planilha do Google Sheets para uma Realtime Database do Firebase. Utilizamos para publicar e disponibilizar para o aplicativo os dados coletados.

## Configurando

Altere o `<SPREADSHEET-ID>` e o `<FIREBASE-URL>` do objeto `environment` pela ID da planilha do Google Sheets e a URL do Firebase Realtime Database. Depois, na planilha desejada, acesse a opção _Ferramentas_ -> _Editor de script_ e cole ambos os arquivos.

Ainda no editor de script, selecione a opção _Executar_ -> _Executar função_ -> _initialize_. Serão solicitadas as permissões para executar o script.

O script será executado automaticamente toda vez que houver uma alteração na planilha.

## Sobre

O código fornecido é baseado no snippet de [Edwin Lee](https://gist.github.com/edwinlee) disponível [neste artigo do Medium](https://medium.com/firebase-developers/sheets-to-firebase-33132e31935b).
