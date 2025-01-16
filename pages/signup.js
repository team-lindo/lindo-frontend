import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Checkbox, Form, Input, Button, Row, Col, Typography } from "antd";
import { useCallback, useState } from "react";
import useInput from "../hooks/useinput";
import dynamic from "next/dynamic";

const { Title, Text } = Typography;

const Signup = () => {
  const [id, onChangeId] = useInput('');
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      setPasswordError(true);
      return;
    }
    if (!term) {
      setTermError(true);
      return;
    }
    console.log(id, nickname, password);
  }, [id, nickname, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입</title>
      </Head>
      <Row justify="center" style={{ marginTop: "50px" }}>
        <Col xs={22} sm={18} md={12} lg={10}>
          <Form
            onFinish={onSubmit}
            layout="vertical"
            style={{ background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
          >
            <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>회원가입</Title>

            <Form.Item
              label="아이디"
              name="user_id"
              rules={[{ required: true, message: "아이디를 입력해주세요." }]}
            >
              <Input value={id} onChange={onChangeId} placeholder="아이디를 입력하세요" />
            </Form.Item>

            <Form.Item
              label="닉네임"
              name="nickname"
              rules={[{ required: true, message: "닉네임을 입력해주세요." }]}
            >
              <Input value={nickname} onChange={onChangeNickname} placeholder="닉네임을 입력하세요" />
            </Form.Item>

            <Form.Item
              label="비밀번호"
              name="user_password"
              rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
            >
              <Input.Password value={password} onChange={onChangePassword} placeholder="비밀번호를 입력하세요" />
            </Form.Item>

            <Form.Item
              label="비밀번호 확인"
              name="user_password_check"
              validateStatus={passwordError ? "error" : ""}
              help={passwordError ? "비밀번호가 일치하지 않습니다." : ""}
              rules={[{ required: true, message: "비밀번호를 다시 입력해주세요." }]}
            >
              <Input.Password
                value={passwordCheck}
                onChange={onChangePasswordCheck}
                placeholder="비밀번호를 다시 입력하세요"
              />
            </Form.Item>

            <Form.Item>
              <Checkbox
                checked={term}
                onChange={onChangeTerm}
                style={{ display: "block" }}
              >
                회원가입 약관에 동의합니다.
              </Checkbox>
              {termError && <Text type="danger">약관에 동의하셔야 합니다.</Text>}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={!term || passwordError}
              >
                가입하기
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AppLayout>
  );
};

export default dynamic(() => Promise.resolve(Signup), { ssr: false });
