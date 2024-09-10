import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createPost, changePost, cleanError } from '../store/post/post.slice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function PostForm() {
  const dispatch = useDispatch();
  const {title, description} = useSelector((state) => state.post.post);
  const {createPostError} = useSelector((state) => state.post);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({title, description}));
  }

  useEffect(() => {
    return ()=>{
      dispatch(cleanError());
    }
  },[]);


  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Post Title</Form.Label>
        <Form.Control 
            type="title" 
            placeholder="Enter title" 
            value={title}
            onChange={(e) => dispatch(changePost({name: "title", value: e.target.value}))}  
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Post Description</Form.Label>
        <Form.Control 
            type="description" 
            placeholder="Enter Description" 
            value={description}
            onChange={(e)=>dispatch(changePost({name: "description", value: e.target.value}))}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      {createPostError && <div style={{color: "red"}}>{createPostError}</div>}
    </Form>
  );
}

export default PostForm;