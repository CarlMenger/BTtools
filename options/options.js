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

function updatePreview(clear = false) {
  const previewContainer = $('#previewContainer');
  // Clear existing preview
  previewContainer.empty();

  const tableNames = generateTableNames(clear)

  previewContainer.append(`<div>${tableNames.inputTableName}</div>`);
  previewContainer.append(`<div>${tableNames.outputTableName}</div>`);
  previewContainer.append(`<div>${tableNames.referenceTableName}</div>`);
}
