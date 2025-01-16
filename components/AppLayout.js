import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Row, Col } from "antd";
//import { useSelector } from 'react-redux';

const AppLayout = ({ children }) => {
  const menuItems = [
    {
      key: "help",
      label: <Link href="/help">고객센터</Link>,
    },
    {
      key: "settings",
      label: <Link href="/settings">설정</Link>,
    },
    {
      key: "login",
      label: <Link href="/login">로그인</Link>,
    },
  ];

  // 로고와 메인 메뉴를 하나의 배열로 병합
  const combinedMenuItems = [
    {
      key: "logo",
      style: { marginLeft: "10px" },
      label: (
        <Link href="/" style={{ fontWeight: "bold", fontSize: "20px" }}>
          로고 
        </Link>
      )
      ,
    },
    ...[
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
    ],
  ];

  return (
    <div>
      {/* 상단 오른쪽 메뉴 */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px 20px",
          borderBottom: "1px solid #d9d9d9",
        }}
      >
        <Menu mode="horizontal" items={menuItems} style={{ borderBottom: "none" }} />
      </div>

      {/* 로고와 메인 메뉴 */}
      <Menu
        mode="horizontal"
        items={combinedMenuItems}
        style={{
          display: "flex",
          justifyContent: "space-between", // 로고와 메뉴 항목을 양쪽으로 배치
          alignItems: "center",
          lineHeight: "64px",
          fontSize: "16px",
          padding: "0 20px",
          gap: "1px",
        }}
      />

      {/* 반응형 레이아웃 */}
      <Row gutter={8}>
        <Col xs={24} md={6}></Col>
        <Col xs={24} md={12}>{children}</Col>
        <Col xs={24} md={6}></Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout