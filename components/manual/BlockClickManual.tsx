import Image from 'next/image';
import React from 'react';

function BlockClickManual() {
  return (
    <div>
      <h3>시간 선택하기</h3>
      <Image
        src="/gifs/seeYouThenBlockClick.gif"
        alt="seeYouThenBlockClick"
        width="900"
        height="500"
      />
      <p>
        이름을 입력 혹은 선택합니다.
        <br />
        시작하는 시간을 먼저 클릭한 후 끝나는 시간을 클릭합니다
      </p>
    </div>
  );
}

export default BlockClickManual;
