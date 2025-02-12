import AppLayout from "../components/AppLayout";
import { useCallback, useEffect } from "react";
import { Form, Input, Button, Row, Col, message, Card, Typography, Divider } from "antd"; // ✅ UI 개선
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import useInput from "../hooks/useInput";
import { logIn } from "../reducers/user";
import { fetchProduct } from "../reducers/product"

const { Title, Text } = Typography;

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me, logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (logInError) {
      message.error(logInError);
    }
  }, [logInError]);

  useEffect(() => {
    if (me) {
      message.success("로그인 성공!");
      dispatch(fetchProduct(me.id)); 
      router.push("/");
    }
  }, [me, router, dispatch]);

  const onSubmitForm = useCallback(() => {
    dispatch(logIn({ email, password }));
  }, [email, password, dispatch]);

  return (
    <AppLayout>
      <Head>
        <title>로그인</title>
      </Head>

      <Row justify="center" style={{ marginTop: "50px" }}>
        <Col xs={24} sm={20} md={12} lg={8}>
          <Card
            style={{ borderRadius: "10px", padding: "20px" }}
            hoverable
          >
            <Title level={2} style={{ textAlign: "center" }}>로그인</Title>
            <Divider />

            <Form
              onFinish={onSubmitForm}
              layout="vertical"
              style={{ padding: "10px" }}
            >
              <Form.Item
                label={<Text strong>이메일</Text>}
                name="email"
                rules={[{ required: true, message: "이메일을 입력하세요!" }]}
              >
                <Input
                  type="email"
                  value={email}
                  onChange={onChangeEmail}
                  placeholder="example@example.com"
                />
              </Form.Item>

              <Form.Item
                label={<Text strong>비밀번호</Text>}
                name="password"
                rules={[{ required: true, message: "비밀번호를 입력하세요!" }]}
              >
                <Input.Password
                  value={password}
                  onChange={onChangePassword}
                  placeholder="비밀번호 입력"
                />
              </Form.Item>

              <Form.Item>
                <Row gutter={8} justify="center">
                  <Col span={12}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={logInLoading}
                      block
                    >
                      로그인
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
}

export default Login;
