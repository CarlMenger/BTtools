document.addEventListener("DOMContentLoaded", function () {
  loadSettings();

  // Handle button click to create a test
  document
    .getElementById("createTestButton")
    .addEventListener("click", function () {
      createTestDataMsg();
    });
});



function loadSettings() {
	// Load saved settings or use defaults from localStorage

	console.log(loadBooleanFromLocalStorage('comparison1Checked'));
	console.log(loadBooleanFromLocalStorage('comparison2Checked'));
	console.log(loadBooleanFromLocalStorage('comparison3Checked'));

	const numberOfParts = loadValueFromLocalStorage('numberOfParts', '4');
	updatePartInputs();

  // Load partsName and pre-fill corresponding partsValue
  for (let i = 1; i <= numberOfParts; i++) {
    const partsName = loadValueFromLocalStorage(`partName${i}`);
    const partsValue = loadValueFromLocalStorage(`partValue${i}`);
    
    const partsInput = `
      <div>
        <label for="partValue${i}">${partsName}:</label>
        <input type="text" id="partValue${i}" value="${partsValue}" readonly>
      </div>
    `;

    $('#partsContainer').append(partsInput);
  }
  
	$('#dbId').val(loadValueFromLocalStorage('dbId'));
	$('#inputTable').val(loadValueFromLocalStorage('inputTable'));
	$('#outputTable').val(loadValueFromLocalStorage('outputTable'));
	$('#referenceTable').val(loadValueFromLocalStorage('referenceTable'));
	$('#relativePos').val(loadValueFromLocalStorage('relativePos'));
	$('#numberOfParts').val(loadValueFromLocalStorage('numberOfParts'));

	$("#comparison1")[0].checked = loadBooleanFromLocalStorage('comparison1Checked');
  $("#comparison2")[0].checked = loadBooleanFromLocalStorage('comparison2Checked');
  $("#comparison3")[0].checked = loadBooleanFromLocalStorage('comparison3Checked');

	$('#comparison1Value').val(loadValueFromLocalStorage('comparison1Value'));
	$('#comparison2Value').val(loadValueFromLocalStorage('comparison2Value'));
	$('#comparison3Value').val(loadValueFromLocalStorage('comparison3Value'));
}

function createTestDataMsg() {

  const comparison1 = document.getElementById("comparison1").checked;
  const comparison2 = document.getElementById("comparison2").checked;
  const comparison3 = document.getElementById("comparison3").checked;

  const comparison1Value = document.getElementById("comparison1Value").value || "";
  const comparison2Value = document.getElementById("comparison2Value").value || "";
  const comparison3Value = document.getElementById("comparison3Value").value || "";

  const tableNames = generateTableNames(false);
  console.log("table name: " + tableNames.inputTableName);
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
