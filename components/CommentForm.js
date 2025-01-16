import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Input, Button } from 'antd';

import { addComment } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);

  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (addCommentDone) {
      reset(); // 폼 필드 초기화
    }
  }, [addCommentDone, reset]);

  const onSubmit = (data) => {
    dispatch(
      addComment({
        content: data.commentText,
        postId: post.id,
        userId: id,
      })
    );
  };

  // React Hook Form의 `register`와 Ant Design의 Input 연결
  const registerInput = (name, options) => ({
    ...register(name, options),
    onChange: (e) => setValue(name, e.target.value),
  });

  return (
    <Form onFinish={handleSubmit(onSubmit)} style={{ position: 'relative', margin: 0 }}>
      <Form.Item
        name="commentText"
        rules={[{ required: true, message: '댓글을 입력해주세요.' }]}
        style={{ marginBottom: '8px' }}
      >
        <Input.TextArea
          rows={4}
          placeholder="댓글을 입력하세요"
          {...registerInput('commentText', { required: true })}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
          style={{ position: 'absolute', right: 0, bottom: -40 }}
        >
          추가하기
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
