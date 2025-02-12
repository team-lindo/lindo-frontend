import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux"; // 리덕스 상태 가져오기
import { Layout, Menu, Row, Col } from "antd";
import { getMenuItems, combinedMenuItems } from "./menuItems";
const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
  // Redux에서 user 상태 가져오기
  const me = useSelector((state) => state.user?.me); 
  const isLoggedIn = !!me; 
  const nickname = me?.nickname || "Guest"; 

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

