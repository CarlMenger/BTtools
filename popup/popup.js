document.addEventListener("DOMContentLoaded", function () {
  loadSettings();

  // Handle button click to create a test
  document
    .getElementById("createTestButton")
    .addEventListener("click", function () {
      createTestDataMsg();
    });
});

function loadValueFromLocalStorage(key, defaultValue = '') {
	return localStorage.getItem(key) || defaultValue;
  }
  
function loadBooleanFromLocalStorage(key, defaultValue = false) {
	return localStorage.getItem(key) === 'true' || defaultValue;
}

function loadSettings() {
	// Load saved settings or use defaults from localStorage

	console.log(loadBooleanFromLocalStorage('comparison1Checked'));
	console.log(loadBooleanFromLocalStorage('comparison2Checked'));
	console.log(loadBooleanFromLocalStorage('comparison3Checked'));

	$('#numberOfParts').val(loadValueFromLocalStorage('numberOfParts', '4'));
	updatePartInputs();
  
	$('#dbId').val(loadValueFromLocalStorage('dbId'));
  
	$('#inputTable').val(loadValueFromLocalStorage('inputTable'));
	$('#outputTable').val(loadValueFromLocalStorage('outputTable'));
	$('#referenceTable').val(loadValueFromLocalStorage('referenceTable'));
	$('#relativePos').val(loadValueFromLocalStorage('relativePos'));
  
	// $('#comparison1').prop('checked', loadBooleanFromLocalStorage('comparison1'));
	// $('#comparison2').prop('checked', loadBooleanFromLocalStorage('comparison2'));
	// $('#comparison3').prop('checked', loadBooleanFromLocalStorage('comparison3'));

	$("#comparison1")[0].checked = loadBooleanFromLocalStorage('comparison1Checked');
    $("#comparison2")[0].checked = loadBooleanFromLocalStorage('comparison2Checked');
    $("#comparison3")[0].checked = loadBooleanFromLocalStorage('comparison3Checked');

	$('#comparison1Value').val(loadValueFromLocalStorage('comparison1Value'));
	$('#comparison2Value').val(loadValueFromLocalStorage('comparison2Value'));
	$('#comparison3Value').val(loadValueFromLocalStorage('comparison3Value'));
}

function createTestDataMsg() {
  // Extract data from the popup
  const dbId = document.getElementById("dbId").value || "";
  const inputTable = document.getElementById("inputTable").value || "";
  const outputTable = document.getElementById("outputTable").value || "";
  const referenceTable = document.getElementById("referenceTable").value || "";
  const relativePos = document.getElementById("relativePos").value || 0;

  const comparison1 = document.getElementById("comparison1").checked;
  const comparison2 = document.getElementById("comparison2").checked;
  const comparison3 = document.getElementById("comparison3").checked;

  const comparison1Value = document.getElementById("comparison1Value").value || "";
  const comparison2Value = document.getElementById("comparison2Value").value || "";
  const comparison3Value = document.getElementById("comparison3Value").value || "";

  const tableNames = generateTableNames(false);
  // Message data to be sent to content script
  const message = {
    action: "createTest",
    'inputTableName': tableNames.inputTableName,
    'outputTableName': tableNames.outputTableName,
    'referenceTableName': tableNames.referenceTableName,
    comparisons: [
      { checked: comparison1, value: comparison1Value },
      { checked: comparison2, value: comparison2Value },
      { checked: comparison3, value: comparison3Value },
    ],
  };

  // Send the message to the content script
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}
