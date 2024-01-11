function updatePartInputs(clear = false) {
    const numberOfParts = $('#numberOfParts').val();
    const tablePartsContainer = $('#tableParts');
  
    // Store current values
    const currentPartNames = [];
    const currentPartValues = [];
  
    for (let i = 1; i <= numberOfParts; i++) {
      currentPartNames[i] = $(`#partName${i}`).val() || '';
      currentPartValues[i] = $(`#partValue${i}`).val() || '';
    }
  
    // Clear existing part inputs
    tablePartsContainer.empty();
  
    // Generate new part inputs
    for (let i = 1; i <= numberOfParts; i++) {
      const partNameInput = `
        <div>
          <label for="partName${i}">Part ${i} Name:</label>
          <input type="text" id="partName${i}" name="partName${i}" value="${clear ? '' : currentPartNames[i]}">
        </div>
      `;
      tablePartsContainer.append(partNameInput);
  
      const partValueInput = `
        <div>
          <label for="partValue${i}">Part ${i} Value:</label>
          <input type="text" id="partValue${i}" name="partValue${i}" value="${clear ? '' : currentPartValues[i]}">
        </div>
      `;
      tablePartsContainer.append(partValueInput);
    }
  }

function insertAt(arr, index, element) {
  // Negative values to determine position from the end of arr. -1 == one from end.
  if (index < 0) {
    index = arr.length + index + 1; // +1 to insert after the specified index
  }

  // Insert the element at the specified index
  arr.splice(index, 0, element);
  return arr
}

function insertAt(arr, index, value) {
  const result = [...arr];
  result.splice(index, 0, value);
  return result;
}

function loadValueFromLocalStorage(key, defaultValue = '') {
	return localStorage.getItem(key) || defaultValue;
  }
  
function loadBooleanFromLocalStorage(key, defaultValue = false) {
	return localStorage.getItem(key) === 'true' || defaultValue;
}

function generateTableNames(clear) {

  const relativePos = parseInt($('#relativePos').val() || "-1");
  const dbId = clear ? '' : $('#dbId').val() || '';
  const numberOfParts = $('#numberOfParts').val();
  let partValues = [];

  for (let i = 1; i <= numberOfParts; i++) {
    let partValue = clear ? '' : $(`#partValue${i}`).val() || '';
    if (partValue) {
      partValues.push(partValue);
    }
  }

  // Create test name as table name without db prefix part and vec/out/res.
  const testName = partValues.join('_');
  partValues = insertAt(partValues, relativePos, 'PlAcEhOlDeR');

  const tableName = `${dbId}.${partValues.join('_')}`;

  const inputTable = clear ? '' : $('#inputTable').val() || '';
  const outputTable = clear ? '' : $('#outputTable').val() || '';
  const referenceTable = clear ? '' : $('#referenceTable').val() || '';

  const inputTableName = `${tableName}`.replace(/PlAcEhOlDeR/g, `${inputTable}`);
  const outputTableName = `${tableName}`.replace(/PlAcEhOlDeR/g, `${outputTable}`);
  const referenceTableName = `${tableName}`.replace(/PlAcEhOlDeR/g, `${referenceTable}`);

  return {
    'inputTableName': inputTableName,
    'outputTableName': outputTableName,
    'referenceTableName': referenceTableName,
    'tableName': testName
  }
}

