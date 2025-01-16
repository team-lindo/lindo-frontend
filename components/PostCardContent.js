import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

const PostCardContent = ({ 
  postData, 
  editMode = false, // 기본값 설정
  onChangePost, 
  onCancelUpdate 
}) => {
  const { updatePostLoading, updatePostDone } = useSelector((state) => state.post);
  const [editText, setEditText] = useState(postData);

  useEffect(() => {
    if (updatePostDone) {
      onCancelUpdate();
    }
  }, [updatePostDone, onCancelUpdate]);

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  const onClickCancel = useCallback(() => {
    setEditText(postData);
    onCancelUpdate();
  }, [postData, onCancelUpdate]);

  return ( // 첫 번째 게시물이다냥 #츄르 #닭가슴살
    <div>
      {editMode
        ? (
          <>
            <TextArea value={editText} onChange={onChangeText} />
            <Button.Group>
              <Button loading={updatePostLoading} onClick={() => onChangePost(editText)}>수정</Button>
              <Button type="danger" onClick={onClickCancel}>취소</Button>
            </Button.Group>
          </>
        )
        // 공백과 해쉬태그 기준으로 구분
        : postData.split(/(#[^\s#]+)/g).map((v, i) => {
          // 해쉬태그인 경우
          if (v.match(/(#[^\s#]+)/)) {
            return (
              <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}>
                {v}
              </Link>
            );
          }
          // 일반 글
          return v;
        })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  editMode: PropTypes.bool, // 기본값이 있어도 PropTypes는 남겨둠
  onChangePost: PropTypes.func.isRequired,
  onCancelUpdate: PropTypes.func.isRequired,
};

export default PostCardContent;
