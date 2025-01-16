import { Form, Input, Button } from "antd";
import { useMemo } from "react";

const NicknameEditForm = () => {
  const style = useMemo(
    () => ({
      marginBottom: "20px",
      border: "1px solid #d9d9d9",
      padding: "20px",
    }),
    []
  );

  const handleSubmit = (values) => {
    console.log("닉네임 수정 요청:", values.nickname);
  };

  return (
    <Form
      style={style}
      onFinish={handleSubmit} // 폼 제출 핸들러
    >
      <Form.Item
        name="nickname" // 폼 필드 이름
        rules={[{ required: true, message: "닉네임을 입력하세요!" }]} // 유효성 검사
      >
        <Input addonBefore="닉네임" placeholder="닉네임을 입력하세요" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          수정
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NicknameEditForm;
