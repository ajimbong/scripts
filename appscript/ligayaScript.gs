function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Savings Tracker')
      .addItem('Add New Saving', 'addNewSaving')
      .addToUi();
}

function addNewSaving() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow() - 1;
  
  // Get the last 'No' value and increment it
  var newNo = 1;
  if (lastRow > 3) { // Data starts from row 4
    newNo = sheet.getRange(lastRow, 1).getValue() + 1;
  }
  
  // Get current date
  var currentDate = new Date();
  
  // Prompt for amount
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('Enter Saving Amount', 'Please enter the amount you want to save:', ui.ButtonSet.OK_CANCEL);
  
  if (response.getSelectedButton() == ui.Button.OK) {
    var amount = parseInt(response.getResponseText(), 10);
    
    if (isNaN(amount)) {
      ui.alert('Invalid amount. Please enter a whole number.');
      return;
    }
    
    // Create new row after last row
    sheet.insertRowAfter(lastRow);

    // Insert new row at the end
    var newRow = lastRow + 1;
    
    // Add data to the new row
    sheet.getRange(newRow, 1).setValue(newNo);
    sheet.getRange(newRow, 2).setValue(currentDate);
    sheet.getRange(newRow, 3).setValue(amount);

    // Format the date cell
    sheet.getRange(newRow, 2).setNumberFormat('mm-dd-yyyy');
    
    // Format the amount cell
    sheet.getRange(newRow, 3).setNumberFormat('#,##"FCFA"');
    
    // Update the total
    updateTotal();
    
    ui.alert('New saving added successfully and total updated!');
  } else {
    ui.alert('Operation cancelled.');
  }
}

function updateTotal() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow() - 1;
  var dataRange = sheet.getRange(4, 3, lastRow - 3); // Data starts from row 4
  var values = dataRange.getValues();
  
  var total = values.reduce((sum, row) => sum + (typeof row[0] === 'number' ? row[0] : 0), 0);
  
  // Assuming the total row is the last row
  sheet.getRange(lastRow + 1, 3).setValue(total).setNumberFormat('#,##"FCFA"');
}