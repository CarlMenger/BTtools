function getStrategyName(country, code) {

    // These code are constant between users, hardcoded into web sourcecode. No idea why these numbers. 
    let strategies = [
        {name:"CREDIT BUREAU", cz:35, sk:39, abbr:'CB' },
        {name:"CASH PRELIM", cz:508, sk:563, abbr:'' },
        {name:"CASH PRE", cz:537, sk:691, abbr:'' },
        {name:"CASH KEY", cz:725, sk:823, abbr:'' },
        {name:"REVOLVING PRELIM", cz:845, sk:1, abbr:'' },
        {name:"REVOLVING PRE", cz:348, sk:328, abbr:'' },
        {name:"REVOLVING KEY", cz:677, sk:591, abbr:'' },
        {name:"POS PRELIM", cz:760, sk:440, abbr:'' },
        {name:"POS PRE", cz:867, sk:472, abbr:'' },
        {name:"POS KEY", cz:317, sk:657, abbr:'' },
        {name:"CLIP PRE", cz:800, sk:260, abbr:'' },
        {name:"CLIP KEY", cz:3392, sk:3001, abbr:'' }
    ]; 
    // Find the strategy object based on the provided country and code
    let strategy = strategies.find(strategy => strategy[country] === code);
    return strategy ? strategy.name : null;
}

function fillTest(message) {
    // Get vars from current URL
    let url = new URL(window.location.href);
    let destination = url.href.includes("sk") ? "sk" : "cz";
    let sidebarTab = url.href.includes("user-simulations") ? "simulations" : "master";
    let code = parseInt(url.href.match(/\d+/)[0]);
    let strategyName = getStrategyName(destination, code);

    console.log("Destination: " + destination);
    console.log("SidebarTab: " + sidebarTab);
    console.log("Code: " + code + typeof(code));
    console.log("Strategy Name:", strategyName);

    // Extract data from the extension popup
    const tableNameSuffix = message.tableNameSuffix;
    const owner = message.owner;
    const system = message.system;
    const creditPhase = message.creditPhase;
    const suffixCheckBoxes = message.suffixCheckBoxes;

    // Get BT elements from test window
    const testNameInput = document.querySelector("#name"); 
    const tableVector = document.querySelector("#inputTable");
    const tableOut = document.querySelector("#outputTable");
    const tableResult = document.querySelector("#referenceTable");

    // Identify buttons on est window
    let addSuffixButton = document.querySelector('[data-automation-id=add-suffix-button]');
    let saveTestButton = document.querySelector('[data-automation-id=save-button]');

    // Create table names
    const testName = `${owner}_${system}_${creditPhase}_${tableNameSuffix}`;
    const tableNameVector = `ap_uwi.${owner}_${system}_${destination}_${creditPhase}_vector_${tableNameSuffix}`;
    const tableNameOut = `ap_uwi.${owner}_${system}_${destination}_${creditPhase}_out_${tableNameSuffix}`;
    const tableNameResult = `ap_uwi.${owner}_${system}_${destination}_${creditPhase}_result_${tableNameSuffix}`;

    // ============================================ SET INPUTS ============================================
    // Set the text content of elements
    dispatchValueIntoElement(testNameInput, testName);
    dispatchValueIntoElement(tableVector, tableNameVector);
    dispatchValueIntoElement(tableOut, tableNameOut);
    
    if (sidebarTab == 'simulations') {
        // Click the "Add suffix" button the desired number of times
        for (let index = 0; index < suffixCheckBoxes.length; index++) {
            if (addSuffixButton && suffixCheckBoxes[index]) {
                dispatchClickToElement(addSuffixButton);
                let suffingInput = document.querySelector(`[data-automation-id="suffix${index}"]`);
                dispatchValueIntoElement(suffingInput, suffixCheckBoxes[index]);
            };
        }

        // Check the checkbox to allow comparison
        const allowResultTableComparison = document.querySelector('[data-automation-id="use-suffix-for-comparison"]');
        allowResultTableComparison.click();
        dispatchValueIntoElement(tableResult, tableNameResult);
    }
    // Click the "Save" button
    dispatchClickToElement(saveTestButton);
}

function dispatchValueIntoElement(inputElement, inputValue) {
    if (inputElement) {
        inputElement.value  = inputValue;
        inputElement.dispatchEvent(new Event('input'));
    }
}
function dispatchClickToElement(inputElement) {
    if (inputElement) {
        inputElement.dispatchEvent(new Event('click'));
    }
}
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "createTest") {

        console.log("[Info] Received data from popup");

        // // Get the destination from current URL
        // var currentUrl = window.location.href;
        // var url = new URL(currentUrl);
        // var destination = url.href.includes("sk") ? "SK" : "CZ";
        // console.log("Destination: " + destination);

        // Extract data from the extension popup
        // const tableNameSuffix = message.tableNameSuffix;
        // const owner = message.owner;
        // const system = message.system;
        // const creditPhase = message.creditPhase;
        // const suffixCheckBoxes = message.suffixCheckBoxes;

        const createTestButton = document.querySelector('[data-automation-id=create-test-button]');
        dispatchClickToElement(createTestButton);
        setTimeout(fillTest, 1000, message);

        // Print values for debugging
        // console.log(`tableSuffix: ${tableNameSuffix} Type: ${typeof tableNameSuffix}`);
        // console.log(`owner: ${owner} Type: ${typeof owner}`);
        // console.log(`system: ${system} Type: ${typeof system}`);
    }
});
