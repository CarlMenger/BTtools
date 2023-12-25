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