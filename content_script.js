  // 경고 메시지 생성 함수
  const createWarningMessage = () => {
    const message = document.createElement('div');
    message.style.position = 'fixed';
    message.style.top = '0';
    message.style.left = '0';
    message.style.width = '100%';
    message.style.backgroundColor = '#AB1628';
    message.style.color = 'white';
    message.style.padding = '10px';
    message.style.zIndex = '9999';
    message.style.fontFamily = 'Arial, sans-serif';
    message.style.fontSize = '14px';
    message.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
    message.style.animation = 'slideDown 0.5s ease-out';
    message.innerHTML = '<p><strong>Warning:</strong><p/><p>이 웹 사이트는 안전하지 않을 수 있습니다.</p><p>※보안에 유의하세요.</p>';

    // 애니메이션 효과 추가
    const style = document.createElement('style');
    style.innerHTML = `
  @keyframes slideDown {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(0); }
  }
`;
    document.head.appendChild(style);

    return message;
  };

  
  const redirectToHttps = (httpsUrl) => {
    fetch(httpsUrl, { method: 'GET' })
      .then((response) => {
        if (response.ok) {
          window.location.href = httpsUrl;
        } else {
          console.log('HTTPS 연결 실패');
        }
      })
      .catch((error) => {
        console.log('에러:', error);
      });
  };

  const checkAndRedirect = () => {
    chrome.storage.sync.get('paused', (data) => {
      if (!data.paused && window.location.protocol !== 'https:') {
        const message = createWarningMessage();
        document.body.insertBefore(message, document.body.firstChild);

        const httpsUrl = `https://${window.location.hostname}${window.location.pathname}`;
        redirectToHttps(httpsUrl);
      }
    });
  };

checkAndRedirect();