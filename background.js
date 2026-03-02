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
    },
    {
      id: 'scoring-console-deploy',
      matches: [
        "*://*.dev.cs.infra/*",
        "*://*.cs.infra/*"
      ],
      js: ['scripts/scoring-console-deploy.js'],
      runAt: 'document_end',
      world: 'MAIN'
    }
  ])
