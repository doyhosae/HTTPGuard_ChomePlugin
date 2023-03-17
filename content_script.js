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


// HTTPS로 리다이렉션하는 함수
const redirectToHttps = (httpsUrl) => {
  fetch(httpsUrl, {method: 'GET'})
    .then((response) => {
      if (response.ok) {
        // HTTPS 연결이 성공하면 HTTPS URL로 이동합니다.
        window.location.href = httpsUrl;
      } else {
        // HTTPS 연결이 실패하면 오류 메시지를 출력합니다.
        console.log('HTTPS 연결 실패');
      }
    })
    .catch((error) => {
      // HTTPS 연결 시도 중 오류가 발생한 경우 오류 메시지를 출력합니다.
      console.log('에러:', error);
    });
};

// 현재 프로토콜이 HTTPS가 아닌 경우
if (window.location.protocol !== 'https:') {
  // 경고 메시지를 생성하고 페이지 상단에 삽입합니다.
  const message = createWarningMessage();
  document.body.insertBefore(message, document.body.firstChild);

  // HTTPS 버전의 URL을 생성하고 리다이렉션을 시도합니다.
  const httpsUrl = `https://${window.location.hostname}${window.location.pathname}`;
  redirectToHttps(httpsUrl);
}
