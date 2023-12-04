document.addEventListener('DOMContentLoaded', function () {
    console.log('[Info] options.js loaded');
    // Load saved settings or use defaults
    loadSettings();
  
    // Handle form submission
    document.getElementById('optionsForm').addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Get values from the form
    //   let owner = document.getElementById('owner').value;
    //   let system = document.getElementById('system').value;
    //   let creditPhase = document.getElementById('creditPhase').value;
  
      // Save settings
      saveSettings();
      showSavedMessage();
      // Notify the user that settings are saved (you might want to use a more user-friendly notification)
      // alert('Settings saved!');
    });
  });
  
  function loadSettings() {
    // Load saved settings or use defaults
    document.getElementById('owner').value = localStorage.getItem('owner') || 'MB';
    document.getElementById('system').value = localStorage.getItem('system') || 'EKIS';
    document.getElementById('creditPhase').value = localStorage.getItem('creditPhase') || 'CB';
  
    document.getElementById('comparison1').checked = localStorage.getItem('comparison1Checked') === 'true';
    document.getElementById('comparison2').checked = localStorage.getItem('comparison2Checked') === 'true';
    document.getElementById('comparison3').checked = localStorage.getItem('comparison3Checked') === 'true';

    document.getElementById('comparison1Value').value = localStorage.getItem('comparison1Value') || '';
    document.getElementById('comparison2Value').value = localStorage.getItem('comparison2Value') || '';
    document.getElementById('comparison3Value').value = localStorage.getItem('comparison3Value') || '';
  }
  
  function saveSettings() {
    // Save settings to localStorage
    localStorage.setItem('owner', document.getElementById('owner').value);
    localStorage.setItem('system', document.getElementById('system').value);
    localStorage.setItem('creditPhase', document.getElementById('creditPhase').value);

    localStorage.setItem('comparison1Checked', document.getElementById('comparison1').checked);
    localStorage.setItem('comparison2Checked', document.getElementById('comparison2').checked);
    localStorage.setItem('comparison3Checked', document.getElementById('comparison3').checked);

    localStorage.setItem('comparison1Value', document.getElementById('comparison1Value').value);
    localStorage.setItem('comparison2Value', document.getElementById('comparison2Value').value);
    localStorage.setItem('comparison3Value', document.getElementById('comparison3Value').value);
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