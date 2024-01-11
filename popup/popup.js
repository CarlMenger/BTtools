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
        <input type="text" id="partValue${i}" value="${partsValue}" value>
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

  let comparisonChecks = [
    document.getElementById("comparison1").checked,
    document.getElementById("comparison2").checked,
    document.getElementById("comparison3").checked
 ]

 let comparisonValues = [
    document.getElementById("comparison1Value").value || "",
    document.getElementById("comparison2Value").value || "",
    document.getElementById("comparison3Value").value || "",
 ]

  let comparisons = [];
  for (let i = 0; i <= Math.min(comparisonChecks.length,comparisonValues.length); i++) {
    if (comparisonChecks[i] && comparisonValues[i]){
      comparisons.push(comparisonValues[i])
    }
  }
  console.log("comparisons: " + comparisons);
  const tableNames = generateTableNames(false);
  // Message data to be sent to content script
  const message = {
    action: "createTest",
    'inputTableName': tableNames.inputTableName,
    'outputTableName': tableNames.outputTableName,
    'referenceTableName': tableNames.referenceTableName,
    'testName': tableNames.tableName,
    // comparisons: [
    //   { checked: comparison1, value: comparison1Value },
    //   { checked: comparison2, value: comparison2Value },
    //   { checked: comparison3, value: comparison3Value },
    // ],
    comparisons: comparisons
  };

  // Send the message to the content script
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}
