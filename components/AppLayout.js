import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux"; // 리덕스 상태 가져오기
import { Layout, Menu, Row, Col } from "antd";
import { getMenuItems, combinedMenuItems } from "./menuItems";
const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
  // Redux에서 user 상태 가져오기
  const me = useSelector((state) => state.user?.me); // user.me가 없을 경우 undefined 반환
  const isLoggedIn = !!me; // user 객체가 존재하면 로그인 상태
  const nickname = me?.nickname || "Guest"; // 닉네임이 없으면 기본값 설정

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
        <Menu mode="horizontal" items={getMenuItems(isLoggedIn, nickname)} style={{ borderBottom: "none" }} />
      </div>

      {/* 로고와 메인 메뉴 */}
      <Menu
        mode="horizontal"
        items={combinedMenuItems}
        style={{
          display: "flex",
          justifyContent: "space-between",
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

export default AppLayout;


/*import React from "react"; 
import PropTypes from "prop-types";
import Link from "next/link";
import { Layout,Menu, Row, Col, Card  } from "antd";
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
 <div style={{ padding: "20px" }}>
        <Row gutter={[16, 16]} justify="start">
          {React.Children.map(children, (child, index) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={index}>
              <Card
                hoverable
                style={{
                  borderRadius: "12px", 
                  textAlign: "center",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                {child}
              </Card>
            </Col>
          ))}
        </Row>
      </div>

    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout
*/