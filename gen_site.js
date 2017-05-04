const Fs = require('fs');

const patches = {
  __HTML_IMPORT__: 'src/html_import.html',
  __HEADER__: 'src/header.html',
  __GOOGLE_ANALYTICS__: 'src/google_analytics.html'
};

let filesToPatch = [
  ['src/introduction.html', 'web/index.html'],
  ['src/vsd.html', 'web/vsd.html'],
  ['src/vs_toolkit.html', 'web/vs_toolkit.html'],
  ['src/gl_ui.html', 'web/gl_ui.html'],
  ['src/animated_transition.html', 'web/animated_transition.html'],
  ['src/dataflow.html', 'web/dataflow.html']
  // ["src/first_application.html", "first_application.html"],
  // ["src/object_model.html", "object_model.html"],
  // ["src/template.html", "template.html"]
  // ["src/examples.html", "examples.html"]
];

function loadPatches(endLoad) {
  let nbPatches = Object.keys(patches).length;

  function loadPatch(key, fileName) {
    Fs.readFile(fileName, 'utf8', (err, data) => {
      patches[key] = data;

      nbPatches--;
      if (!nbPatches && endLoad) endLoad();
    });
  }

  for (const key in patches) {
    loadPatch(key, patches[key]);
  }
}

function patchFiles() {
  function patchFile(srcFileName, trgFileName) {
    Fs.readFile(srcFileName, 'utf8', (err, data) => {
      for (const key in patches) {
        data = data.replace(key, patches[key]);
      }
      Fs.writeFile(trgFileName, data, 'utf8', writeErr => {
        if (writeErr) console.error(writeErr);
      });
    });
  }

  filesToPatch.forEach(data => patchFile(data[0], data[1]));
}

loadPatches(patchFiles);
