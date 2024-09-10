import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './cmps/NavBar.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './cmps/ErrorPage.jsx';
import LoginForm from './cmps/LoginForm.jsx';
import SignupForm from './cmps/SignupForm.jsx';
import Root from './router/Root.jsx';
import App from './App.jsx';
import Post from './cmps/Post.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import PostForm from './cmps/PostForm.jsx';
import ProtectedRoutes from './cmps/ProtectedRoutes.jsx'; 


// it is react-router-dom lib
// so use createBrowserRouter as it is only used in browser
const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [ //nested routes
        {
          path: '/',
          element: <App />
        },
        {
          path: '/login',
          element: <LoginForm />
        },
        {
          path: "post",
          element: <Post />
        },
        {
          path: '/signup',
          element: <SignupForm />
        },
        { 
          path: "/postForm",
          element: <ProtectedRoutes><PostForm /></ProtectedRoutes>
        }
      ]
    }
  ]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
     
  </StrictMode>,
)
