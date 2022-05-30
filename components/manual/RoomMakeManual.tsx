import Image from 'next/image';
import React from 'react';

function RoomMakeManual() {
  return (
    <div>
      <h3>방 만들기</h3>
      <Image
        src="/gifs/seeYouThenRoomMake.gif"
        alt="seeYouThenRoomMake"
        width="900"
        height="500"
      />
      <p>'방만들기' 페이지에서 이름 입력 시 새로운 방을 자동으로 생성합니다</p>
    </div>
  );
}

export default RoomMakeManual;
