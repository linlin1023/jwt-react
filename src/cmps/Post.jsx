import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import { fetchPosts } from '../store/post/post.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


function BasicExample() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const posts = useSelector((state) => state.post.posts);

  return (
    <>
      <Button variant="primary" onClick={()=>{navigate("/postForm")}}>Create Post</Button>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {
          posts.map(post=>{
            return (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.description}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
    </>

  );
}

export default BasicExample;