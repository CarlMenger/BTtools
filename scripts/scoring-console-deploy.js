(function() {
  // Only run if URL matches the required dynamic pattern
  // Examples: scoring-console-czekis.dev.cs.infra, scoring-console.cz39b1.cs.infra
  const hostPattern = /^scoring-console(-|\.)((cz|sk)[a-z0-9]+)(\.dev)?\.cs\.infra$/;
  const hostMatches = hostPattern.test(window.location.hostname);
  const pathMatches = window.location.pathname.startsWith('/deployment');
  
  if (!hostMatches || !pathMatches) {
    return;
  }

  function setDeploymentTime() {
    const input = document.getElementById('downloadDeployDate');
    
    if (input) {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 2);
      
      // Format as DD.MM.YYYY HH:mm:ss
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      const timeValue = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
      
      input.value = timeValue;
      
      // Trigger input event in case the page is listening for changes
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  // Try immediately if DOM is already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setDeploymentTime);
  } else {
    setDeploymentTime();
    
    // Also try after a short delay in case elements are added dynamically
    setTimeout(() => {
      setDeploymentTime();
    }, 500);
  }
})();
