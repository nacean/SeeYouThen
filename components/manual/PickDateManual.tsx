import Image from 'next/image';
import React from 'react';

function PickDateManual() {
  return (
    <div>
      <h3>날짜 선택하기</h3>
      <Image
        src="/gifs/seeYouThenPickDate.gif"
        alt="seeYouThenPickDate"
        width="1000"
        height="600"
      />
      <p>
        날짜 선택 후, 날짜변경 버튼을 누릅니다
        <br />
        변경 시 저장했던 시간은 초기화됩니다
      </p>
    </div>
  );
}

export default PickDateManual;
