const { ipcRenderer } = require('electron');

const { confirm } = window;

const iframe = document.querySelector('iframe');

const resize = () => {
  iframe.width = window.innerWidth;
  iframe.height = window.innerHeight;
};

window.addEventListener('resize', resize);

resize();

iframe.contentWindow.addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey) {
    if (e.which === 67) {
      e.preventDefault();

      const text = iframe.contentWindow.getSelection().toString();
      navigator.clipboard.writeText(text);
    } else if (e.which === 88) {
      e.preventDefault();

      const text = iframe.contentWindow.getSelection().toString();
      navigator.clipboard.writeText(text);

      const { selectionStart, selectionEnd, value } = e.target;

      e.target.value = value.slice(0, selectionStart) + value.slice(selectionEnd);
      e.target.selectionStart = e.target.selectionEnd = selectionStart;
    } else if (e.which === 86) {
      e.preventDefault();

      navigator.clipboard.readText().then(text => {
        const { selectionStart, selectionEnd, value } = e.target;

        e.target.value = value.slice(0, selectionStart) + text + value.slice(selectionEnd);

        e.target.selectionStart = e.target.selectionEnd = selectionStart + text.length;
      });
    } else if (e.which === 65) {
      e.preventDefault();

      e.target.selectionStart = 0;
      e.target.selectionEnd = e.target.value.length;
    }
  }
});

window.addEventListener('message', (e) => {
  if (e && e.data && e.data.avain) {
    if (e.data.avain.close) {
      if (confirm('Are you sure you want to close Avain?')) {
        ipcRenderer.send('avain-close');
      }
    }
  }
});
