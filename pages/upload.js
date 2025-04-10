import Head from "next/head";
import { Row, Col, Card, Typography } from "antd";
import AppLayout from "../components/AppLayout";
import UploadForm from "../components/UploadForm";

const { Title } = Typography;

const UploadPage = () => {
  return (
    <>
      <Head>
        <title>상품 업로드</title>
      </Head>
      <AppLayout>
        <Row justify="center">
         <Col xs={24} sm={22} md={20} lg={16}>
            <Card bordered={false} style={{ padding: "20px", marginTop: "20px" }}>
              <Title level={2} style={{ textAlign: "center" }}></Title>
              <UploadForm />
            </Card>
          </Col>
        </Row>
      </AppLayout>
    </>
  );
};

export default UploadPage;
