
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-LA76ZU4Z.js",
      "dynamicImport": false
    }
  ],
  "projects/app/src/app/views/shell/shell.component.ts": [
    {
      "path": "chunk-HTLUAZCU.js",
      "dynamicImport": false
    }
  ],
  "projects/app/src/app/views/sign-up/sign-up.component.ts": [
    {
      "path": "chunk-VFN73PID.js",
      "dynamicImport": false
    }
  ],
  "projects/app/src/app/views/sign-in/sign-in.component.ts": [
    {
      "path": "chunk-3LKOWXOI.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 63527, hash: 'c7b271c28888cd3948b230baea09193ae50ce88d92d3d8eb17b1b2b2fa6c9a20', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 16723, hash: '836110d0d94c346f22d44caa036ad0738aaefddb4c6a929660506ddbbd066236', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-TMA5GU7Q.css': {size: 88527, hash: '9NJrx7JJ3BU', text: () => import('./assets-chunks/styles-TMA5GU7Q_css.mjs').then(m => m.default)}
  },
};
