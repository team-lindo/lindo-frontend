import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosInstance = axios.create();
const mock = new MockAdapter(axiosInstance, { delayResponse: 500 }); // 500ms 지연 설정

// Mock 데이터 설정

// 로그인 요청
mock.onPost('/user/login').reply(200, {
  id: 1,
  nickname: 'test',
  email: 'test@example.com',
});

// 팔로잉 목록 가져오기
mock.onGet('/user/followings').reply(200, [
  { id: 1, nickname: 'following1' },
  { id: 2, nickname: 'following2' },
]);

// 팔로워 목록 가져오기
mock.onGet('/user/followers').reply(200, [
  { id: 1, nickname: 'follower1' },
  { id: 2, nickname: 'follower2' },
]);

// 내 정보 가져오기
mock.onGet('/user').reply(200, {
  id: 1,
  nickname: 'test',
  email: 'test@example.com',
  Followings: [],
  Followers: [],
});

// 팔로워 제거 요청
mock.onDelete(/\/user\/follower\/\d+/).reply(200, {
    UserId: 2, // 제거된 유저 ID
  });
  
  // 팔로우 요청
  mock.onPatch(/\/user\/\d+\/follow/).reply(200, {
    UserId: 3, // 팔로우한 유저 ID
  });
  
  // 언팔로우 요청
  mock.onDelete(/\/user\/\d+\/follow/).reply(200, {
    UserId: 3, // 언팔로우한 유저 ID
  });
  

// 로그아웃 요청
mock.onPost('/user/logout').reply(200, {
  message: 'Logout successful',
});

// 회원가입 요청
mock.onPost('/user').reply(200, {
  id: 2,
  nickname: 'newUser',
  email: 'new@example.com',
});

// 닉네임 변경 요청
mock.onPatch('/user/nickname').reply(200, {
  nickname: 'updatedNickname',
});

export default axiosInstance;
