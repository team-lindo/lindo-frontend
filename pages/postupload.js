import Head from "next/head";
import { Row, Col, Card, Typography } from "antd";
import AppLayout from "../components/AppLayout";
import PostUploadForm from "../components/PostUploadForm";

const { Title } = Typography;

const PostUploadPage = () => {
  //if (!clothes) return <div>옷장 정보를 불러오는 중입니다...</div>;

  return (
    <>
      <Head>
        <title>게시글 업로드</title>
      </Head>
      <AppLayout>
        <Row justify="center">
         <Col xs={24} sm={22} md={20} lg={16}>
            <Card variant="outlined" style={{ padding: "20px", marginTop: "20px" }}>
              <Title level={2} style={{ textAlign: "center" }}></Title>
              <PostUploadForm />
            </Card>
          </Col>
        </Row>
      </AppLayout>
    </>
  );
};

export default PostUploadPage;
