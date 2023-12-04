$(document).ready(function() {

	console.log("[Info] popup.js was loaded!");

    // Retrieve values from storage
	let owner = localStorage.getItem('owner') || 'MB';
	let system = localStorage.getItem('system') || 'EKIS';
	let creditPhase = localStorage.getItem('creditPhase') || 'CB';
    let comparison1Checked = localStorage.getItem('comparison1Checked');
    let comparison2Checked = localStorage.getItem('comparison2Checked');
    let comparison3Checked = localStorage.getItem('comparison3Checked');
    let comparison1Value = localStorage.getItem('comparison1Value') || '';
    let comparison2Value = localStorage.getItem('comparison2Value') || '';
    let comparison3Value = localStorage.getItem('comparison3Value') || '';

	// Update UI elements with retrieved values
	$("#btOwner").val(owner);
    $("#btSystem").val(system);
    $("#btCreditPhase").val(creditPhase);
	
	// Set checkbox boxes
	$("#comparison1")[0].checked = comparison1Checked === 'true';
    $("#comparison2")[0].checked = comparison2Checked === 'true';
    $("#comparison3")[0].checked = comparison3Checked === 'true';

	// Set HTML values for checkboxes, this one is actually sent to webPage
	$("#comparison1").val(comparison1Value);
	$("#comparison2").val(comparison2Value);
	$("#comparison3").val(comparison3Value);

	console.log("[After] comparison3.checked: " + document.getElementById('comparison3').checked);
	// Set labels for checkboxes 
	$("#comparison1Label").html(comparison1Value || '');
	$("#comparison2Label").html(comparison2Value || '');
	$("#comparison3Label").html(comparison3Value || '');

	console.log('Retrieved values:', owner, system, creditPhase, comparison1Checked, comparison2Checked, comparison3Checked);

	$("#btCreateTestButton").click(() => {
		console.log("[Info] Button was pressed!");

		// Plain JS, because original piece of code was like that.
		var elements = document.querySelectorAll(".btCheckbox[type='checkbox']:checked");
		var suffixCheckBoxes = Array.from(elements).map(function(checkbox) {
		  return checkbox.value;
		});

		// get values from extension popup 
		const data = {
			action				: "createTest",	// action name, runtime.onMessage listener is listening to this exact string so dont change
			tableNameSuffix		: $("#btTicketSuffix").val(), // .first(),
			owner 				: $("#btOwner").val(),
			system 				: $("#btSystem").val() || "EKIS",
			creditPhase 		: $("#btCreditPhase").val() || "CB",
			suffixCheckBoxes	: suffixCheckBoxes, 
		  };
		
		// localStorage.setItem('comparison1Value', data.comparison1Value);
        // localStorage.setItem('comparison2Value', data.comparison2Value);
        // localStorage.setItem('comparison3Value', data.comparison3Value);

		// for (var i = 0; i < data.suffixCheckBoxes.length; i++) {
        // 	console.log(`data.suffixCheckBoxes[i]: ${data.suffixCheckBoxes[i]} Type ${typeof data.suffixCheckBoxes[i]} `)
        // }

		// Send the data to the content script
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, data);
			console.log("msg sent");
		});
	})
});