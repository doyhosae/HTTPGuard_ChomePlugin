document.getElementById('togglePause').addEventListener('click', () => {
  chrome.storage.sync.get('paused', (data) => {
    const paused = !data.paused;
    chrome.storage.sync.set({paused}, () => {
      document.getElementById('togglePause').textContent = paused ? 'Resume Redirect' : 'Pause Redirect';
    });
  });
});
