document.addEventListener('DOMContentLoaded', function () {
  console.log('[Info] options.js loaded');
  // Load saved settings or use defaults
  loadSettings();

  // Handle form submission
  document.getElementById('optionsForm').addEventListener('submit', function (event) {
      event.preventDefault();

      // Save settings
      saveSettings();
      showSavedMessage();
      
  });

  // Handle changes in the number of parts
  $('#numberOfParts').on('input', function () {
      updatePartInputs();
      updatePreview();
  });

  // Handle manual preview button click
  $('#previewButton').on('click', function () {
      updatePreview();
  });

  // Handle clear button click
  $('#clearButton').on('click', function () {
      // Set number of parts to 3
      $('#numberOfParts').val('3');

      // Clear existing part inputs
      $('#tableParts').empty();

      // Generate new part inputs
      updatePartInputs(true); // Pass true to indicate that it's a clear operation
      updatePreview(true); // Pass true to indicate that it's a clear operation
  });
});

function loadSettings() {
  // Load saved settings or use defaults
  $('#numberOfParts').val(localStorage.getItem('numberOfParts') || '4');
  updatePartInputs();

  // Load part names and default values
  for (let i = 1; i <= $('#numberOfParts').val(); i++) {
      $(`#partName${i}`).val(localStorage.getItem(`partName${i}`) || '');
      $(`#partValue${i}`).val(localStorage.getItem(`partValue${i}`) || '');
  }

  // Load DB_id and table names
  $('#dbId').val(localStorage.getItem('dbId') || '');
  $('#inputTable').val(localStorage.getItem('inputTable') || '');
  $('#outputTable').val(localStorage.getItem('outputTable') || '');
  $('#referenceTable').val(localStorage.getItem('referenceTable') || '');
  $('#relativePos').val(localStorage.getItem('relativePos') || '0');

  // Load comparison checkboxes and values
  $('#comparison1').prop('checked', localStorage.getItem('comparison1Checked') === 'true');
  $('#comparison2').prop('checked', localStorage.getItem('comparison2Checked') === 'true');
  $('#comparison3').prop('checked', localStorage.getItem('comparison3Checked') === 'true');

  $('#comparison1Value').val(localStorage.getItem('comparison1Value') || '');
  $('#comparison2Value').val(localStorage.getItem('comparison2Value') || '');
  $('#comparison3Value').val(localStorage.getItem('comparison3Value') || '');

  updatePreview();
}

function saveSettings() {
  // Save settings to localStorage
  localStorage.setItem('numberOfParts', $('#numberOfParts').val());

  // Save part names and default values
  for (let i = 1; i <= $('#numberOfParts').val(); i++) {
      localStorage.setItem(`partName${i}`, $(`#partName${i}`).val());
      localStorage.setItem(`partValue${i}`, $(`#partValue${i}`).val());
  }

  // Save DB_id and table names
  localStorage.setItem('dbId', $('#dbId').val());
  localStorage.setItem('inputTable', $('#inputTable').val());
  localStorage.setItem('outputTable', $('#outputTable').val());
  localStorage.setItem('referenceTable', $('#referenceTable').val());
  localStorage.setItem('relativePos', $('#relativePos').val());

  // Save comparison checkboxes and values
  localStorage.setItem('comparison1Checked', $('#comparison1').prop('checked'));
  localStorage.setItem('comparison2Checked', $('#comparison2').prop('checked'));
  localStorage.setItem('comparison3Checked', $('#comparison3').prop('checked'));

  localStorage.setItem('comparison1Value', $('#comparison1Value').val());
  localStorage.setItem('comparison2Value', $('#comparison2Value').val());
  localStorage.setItem('comparison3Value', $('#comparison3Value').val());

}

function showSavedMessage() {
  const savedMessage = $('<div id="savedMessage">Saved!</div>').appendTo('body');

  // Fade out after 2 seconds
  setTimeout(() => {
    savedMessage.fadeOut(1000, () => {
      // Remove the message from the DOM after fading out
      savedMessage.remove();
    });
  }, 2000);
}

function insertAt(arr, index, element) {
  // Negative values to determine position from the end of arr. -1 == one from end.
  if (index < 0) {
    index = arr.length + index + 1; // +1 to insert after the specified index
  }

  // Insert the element at the specified index
  console.log("insertAt with index: " + index + " --> " + arr);
  arr.splice(index, 0, element);
  console.log("insertAt " + arr);
  return arr
}

function updatePreview(clear = false) {
  const previewContainer = $('#previewContainer');
  const relativePos = parseInt($('#relativePos').val() || "-1");
  // Clear existing preview
  previewContainer.empty();

  const dbId = clear ? '' : $('#dbId').val() || '';
  const numberOfParts = $('#numberOfParts').val();
  let partValues = [];

  for (let i = 1; i <= numberOfParts; i++) {
    let partValue = clear ? '' : $(`#partValue${i}`).val() || '';
    if (partValue) {
      partValues.push(partValue);
    }
  }

  console.log(partValues);
  console.log(relativePos);
  partValues = insertAt(partValues, relativePos, 'PlAcEhOlDeR');
  console.log(partValues);

  const tableName = `${dbId}.${partValues.join('_')}`;

  const inputTable = clear ? '' : $('#inputTable').val() || '';
  const outputTable = clear ? '' : $('#outputTable').val() || '';
  const referenceTable = clear ? '' : $('#referenceTable').val() || '';

  const inputTableName = `${tableName}`.replace(/PlAcEhOlDeR/g, `${inputTable}`);
  const outputTableName = `${tableName}`.replace(/PlAcEhOlDeR/g, `${outputTable}`);
  const referenceTableName = `${tableName}`.replace(/PlAcEhOlDeR/g, `${referenceTable}`);

  previewContainer.append(`<div>${inputTableName}</div>`);
  previewContainer.append(`<div>${outputTableName}</div>`);
  previewContainer.append(`<div>${referenceTableName}</div>`);
}
