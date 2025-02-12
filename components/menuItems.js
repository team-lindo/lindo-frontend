import Link from "next/link";

export const getMenuItems = (isLoggedIn, nickname) => [
  
  {
    key: "help",
    label: <Link href="/help">고객센터</Link>,
  },
  {
    key: "settings",
    label: <Link href="/settings">설정</Link>,
  },
  isLoggedIn
    ? {
        key: "user",
        label: ` ${nickname} 님`,
      }
    : {
        key: "login",
        label: <Link href="/login">로그인</Link>,
        
      },
];

export const combinedMenuItems = [
  {
    key: "logo",
    label: (
      <Link href="/" style={{ fontWeight: "bold", fontSize: "20px" }}>
        로고
      </Link>
    ),
  },
  {
    key: "home",
    label: <Link href="/">홈</Link>,
  },
  {
    key: "search",
    label: <Link href="/search">검색</Link>,
  },
  {
    key: "closet",
    label: <Link href="/closet">옷장</Link>,
  },
  {
    key: "following",
    label: <Link href="/following">팔로잉</Link>,
  },
  {
    key: "profile",
    label: <Link href="/profile">마이</Link>,
  },
  {
    key: "signup",
    label: <Link href="/signup">회원가입</Link>,
  },
];


/*import Link from "next/link";
import { useSelector } from "react-redux";

export const menuItems = () => {
  const { me } = useSelector((state) => state.user);

  return [
    {
      key: "help",
      label: <Link href="/help">고객센터</Link>,
    },
    {
      key: "settings",
      label: <Link href="/settings">설정</Link>,
    },
    me
      ? {
          key: "user",
          label: ` ${me.nickname} 님`,
        }
      : {
          key: "login",
          label: <Link href="/login">로그인</Link>,
        },
  ];
};

export const combinedMenuItems = [
  {
    key: "logo",
    label: (
      <Link href="/" style={{ fontWeight: "bold", fontSize: "20px" }}>
        로고
      </Link>
    ),
  },
  {
    key: "home",
    label: <Link href="/">홈</Link>,
  },
  {
    key: "search",
    label: <Link href="/search">검색</Link>,
  },
  {
    key: "closet",
    label: <Link href="/closet">옷장</Link>,
  },
  {
    key: "following",
    label: <Link href="/following">팔로잉</Link>,
  },
  {
    key: "profile",
    label: <Link href="/profile">마이</Link>,
  },
  {
    key: "signup",
    label: <Link href="/signup">회원가입</Link>,
  },
];
*/