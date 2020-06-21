/**
* Copyright 2019 Google LLC.
* SPDX-License-Identifier: Apache-2.0
*/

/**
* Snippet from Edwin Lee: https://gist.github.com/edwinlee
* On: https://medium.com/firebase-developers/sheets-to-firebase-33132e31935b
*/

function getEnvironment() {
 var environment = {
   spreadsheetID: "<SPREADSHEET-ID>",
   firebaseUrl: "<FIREBASEURL>"
 };
 return environment;
}

// Cria um trigger por alteração na planilha
function createSpreadsheetEditTrigger(sheetID) {
 var triggers = ScriptApp.getProjectTriggers();
 var triggerExists = false;
 for (var i = 0; i < triggers.length; i++) {
   if (triggers[i].getTriggerSourceId() == sheetID) {
     triggerExists = true;
     break;
   }
 }

 if (!triggerExists) {
   var spreadsheet = SpreadsheetApp.openById(sheetID);
   ScriptApp.newTrigger("importSheet")
     .forSpreadsheet(spreadsheet)
     .onChange()
     .create();
 }
}

// Apaga todos os triggers da planilha
function deleteTriggers() {
 var triggers = ScriptApp.getProjectTriggers();
 for (var i = 0; i < triggers.length; i++) {
   ScriptApp.deleteTrigger(triggers[i]);
 }
}

// Inicializa
function initialize(e) {
 writeDataToFirebase(getEnvironment().spreadsheetID);
}

// Escreve o dado na URL do Firebase informada
function writeDataToFirebase(sheetID) {
 var ss = SpreadsheetApp.openById(sheetID);
 SpreadsheetApp.setActiveSpreadsheet(ss);
 createSpreadsheetEditTrigger(sheetID);
 var sheets = ss.getSheets();
 for (var i = 0; i < sheets.length; i++) {
   importSheet(sheets[i]);
   SpreadsheetApp.setActiveSheet(sheets[i]);
 }
}

// A utility function to generate nested object when
// given a keys in array format
function assign(obj, keyPath, value) {
 lastKeyIndex = keyPath.length - 1;
 for (var i = 0; i < lastKeyIndex; ++i) {
   key = keyPath[i];
   if (!(key in obj)) obj[key] = {};
   obj = obj[key];
 }
 obj[keyPath[lastKeyIndex]] = value;
}

// Importa cada planilha quando há uma alteração
function importSheet() {
 var sheet = SpreadsheetApp.getActiveSheet();
 var name = sheet.getName();
 var data = sheet.getDataRange().getValues();

 var dataToImport = {};
 
 for (var i = 1; i < data.length; i++) {
   dataToImport[data[i][0]] = {};
   for (var j = 0; j < data[0].length; j++) {
     assign(dataToImport[data[i][0]], data[0][j].split("__"), data[i][j]);
   }
 }

 var token = ScriptApp.getOAuthToken();

 var firebaseUrl =
   getEnvironment().firebaseUrl + sheet.getParent().getId() + "/" + name;
 var base = FirebaseApp.getDatabaseByUrl(firebaseUrl, token);
 base.setData("", dataToImport);
 
  // Armazena a data da última atualização
 var firebaseTimestampUrl =
   getEnvironment().firebaseUrl + sheet.getParent().getId() + "/ultima_atualizacao";
 FirebaseApp.getDatabaseByUrl(firebaseTimestampUrl, token).setData("", new Date());
 
}
