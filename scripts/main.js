console.log("[info] main.js was loaded!");

$("#btCreateTestButton").click(() => {
	console.log("Button was pressed!");

	// get values from toolBar 
	const tableSuffix 		= $("#btTicketSuffix").first();
	const owner 			= $("#btOwner").first();
	const system 			= $("#btSystem").val() || "EKIS";
	const creditPhase 		= $("#btCreditPhase").val() || "CB";
	const suffixCheckBoxes 	= $(".btCheckbox:checkbox:checked")
	const country 			= 'CZ';		// temp untile we can regex it from URL || some element
	

	// get country from URL
	//console.log(window);
	//console.log(window.location);
	//let country 		= window.location.href.match(/-(\w{2})\./).first() ?? "CZ";

	
	// get BT elements needed for test creation
	const testName 				= $("#name").first();				// Upper most input, name of the Test
	
	const tableVector 			= $("#inputTable").first();
	const tableOut 				= $("#outputTable").first();
	const tableResult 			= $("#referenceTable").first();

	const addSuffixButton 		= $("button > span:contains('Add suffix')").parent(); // Adds input field for suffix
	const suffixInputs			= $(".form-control.ng-pristine.ng-invalid.ng-touched");
	const useSuffixesCheckBox 	= $(".form-check-input").first();	// checkBox at the bottom to enable reference comparison
	
	const createTestButton 		= $("button > span:contains('Create')").parent();
	
	
	// create table names
	let tableVectorName		= `ap_uwi.${owner}_${system}_${country}_${creditPhase}_vector_${tableSuffix}`;
	let tableOutName 		= `ap_uwi.${owner}_${system}_${country}_${creditPhase}_out_${tableSuffix}`;
	let tableResultName		= `ap_uwi.${owner}_${system}_${country}_${creditPhase}_result_${tableSuffix}`;


	// Set BT_table_xxx
	tableVector.text(tableVectorName);
	tableOut.text(tableOutName);
	tableResult.text(tableResultName);

	// Create as many suffix inputs as user checked  
	for (let index = 0; index < suffixCheckBoxes.length; index++) {
		addSuffixButton.click()
	}

	// Add suffixes into suffix inputs 
	if (suffixCheckBoxes.length > 0) suffixInputs[0]?.text(".workflowCode")
	if (suffixCheckBoxes.length > 1) suffixInputs[1]?.text(".koCode")
	if (suffixCheckBoxes.length > 2) suffixInputs[2]?.text(".rejectReason")

	// Check to allow comparison
	useSuffixesCheckBox.click()

	// Finish
	createTestButton.click()

	// Print hell
	console.log(`tableSuffix: ${tableSuffix} Type: ${typeof tableSuffix}`);
	console.log(`owner: ${owner} Type: ${typeof owner}`);
	console.log(`system: ${system} Type: ${typeof system}`);
	console.log(`creditPhase: ${creditPhase} Type: ${typeof creditPhase}`);
	console.log(`suffixCheckBoxes: ${suffixCheckBoxes} Type: ${typeof suffixCheckBoxes}`);
	console.log(`country: ${country} Type: ${typeof country}`);
	console.log(`testName: ${testName} Type: ${typeof testName}`);
	console.log(`tableVector: ${tableVector} Type: ${typeof tableVector}`);
	console.log(`tableOut: ${tableOut} Type: ${typeof tableOut}`);
	console.log(`tableResult: ${tableResult} Type: ${typeof tableResult}`);
	console.log(`addSuffixButton: ${addSuffixButton} Type: ${typeof addSuffixButton}`);
	console.log(`suffixInputs: ${suffixInputs} Type: ${typeof suffixInputs}`);
	console.log(`useSuffixesCheckBox: ${useSuffixesCheckBox} Type: ${typeof useSuffixesCheckBox}`);
	console.log(`createTestButton: ${createTestButton} Type: ${typeof createTestButton}`);
})