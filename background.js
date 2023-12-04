chrome.scripting.registerContentScripts([
    {
      id: 'main',
      matches: [
        "*://*.blazetools-cz.cz.prod/*",
        "*://*.blazetools-sk.cz.prod/*"
      ],
      js: ['scripts/jquery-3.6.3.js','popup/popup.js'],
      runAt: 'document_end',
      world: 'MAIN'
    }
  ])