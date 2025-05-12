import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import { getMenuItems, getCombinedMenuItems } from "./menuItems";
import { useRouter } from "next/router";
//import Link from "next/link";

const AppLayout = ({ children }) => {
  const { pathname } = useRouter();

  const me = useSelector((state) => state.user?.me); 
  const isLoggedIn = !!me; 
  const nickname = me?.nickname || "Guest"; 

  const menuItems = getMenuItems(isLoggedIn, nickname, pathname);
  const combinedItems = getCombinedMenuItems(pathname);

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
        items={combinedItems}
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

      {/* 본문 */}
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;


      {/* 반응형 레이아웃 */}
      {/* <Row gutter={8}>
        <Col xs={24} md={6}></Col>
        <Col xs={24} md={12}>{children}</Col>
        <Col xs={24} md={6}></Col>
      </Row> */}