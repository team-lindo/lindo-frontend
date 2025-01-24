import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

const PostCardContent = ({ 
  postData='', 
  editMode = false, // 기본값 설정
  onChangePost, 
  onCancelUpdate 
}) => {
  const { updatePostLoading, updatePostDone } = useSelector((state) => state.post);
  const [editText, setEditText] = useState(postData || '');

  useEffect(() => {
    if (updatePostDone) {
      onCancelUpdate();
    }
  }, [updatePostDone, onCancelUpdate]);

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  const onClickCancel = useCallback(() => {
    setEditText(postData || '');
    onCancelUpdate();
  }, [postData, onCancelUpdate]);

  // postData가 문자열인지 확인하고 안전하게 처리
  const renderPostContent = useCallback(() => {
    if (typeof postData !== 'string') {
      console.error('postData는 문자열이어야 합니다.', postData);
      return null;
    }

    return postData.split(/(#[^\s#]+)/g).map((v, i) => {
      // 해쉬태그인 경우
      if (v.match(/(#[^\s#]+)/)) {
        return (
          <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}>
            {v}
          </Link>
        );
      }
      // 일반 텍스트 반환
      return v;
    });
  }, [postData]);

  return (
    <div>
      {editMode ? (
        <>
          <TextArea 
            value={editText} 
            onChange={onChangeText} 
            autoSize={{ minRows: 3, maxRows: 6 }} 
          />
        </>
      ) : (
        renderPostContent()
      )}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string, // postData가 없을 경우 대비하여 필수 조건 제거
  editMode: PropTypes.bool,
  onChangePost: PropTypes.func.isRequired,
  onCancelUpdate: PropTypes.func.isRequired,
};



export default PostCardContent;
