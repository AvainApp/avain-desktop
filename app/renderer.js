const { ipcRenderer } = require('electron');

const { confirm } = window;

const iframe = document.querySelector('iframe');

const resize = () => {
  iframe.width = window.innerWidth;
  iframe.height = window.innerHeight;
};

window.addEventListener('resize', resize);

resize();

window.addEventListener('message', (e) => {
  if (e && e.data && e.data.avain) {
    if (e.data.avain.close) {
      if (confirm('Are you sure you want to close Avain?')) {
        ipcRenderer.send('avain-close');
      }
    }
  }
});
