chrome.scripting.registerContentScripts([
    {
      id: 'main',
      matches: ['<all_urls>'],
      js: ['scripts/jquery-3.6.3.js','scripts/main.js'],
      runAt: 'document_end',
      world: 'MAIN'
    }
  ])