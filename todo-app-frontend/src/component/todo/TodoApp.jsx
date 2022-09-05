import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'
import Welcome from './Welcome'
import ErrorPage from './ErrorPage';
import ListTodos from './ListTodos';
import Header from './Header';
import Footer from './Footer';
import Logout from './Logout';
import AuthenticatedRoute from './AuthenticatedRoute';
import TodoComponent from '../TodoComponent';
const TodoApp = () => {
  return (
    <Router>
    <Header/>
     <Routes>
       <Route path="/" element={<Login/>}/>
       <Route path="welcome/:fname" element={ <AuthenticatedRoute><Welcome/></AuthenticatedRoute>}/>
       <Route path="todos" element={ <AuthenticatedRoute><ListTodos/></AuthenticatedRoute>}/>
       <Route path="todos/:id" element={ <AuthenticatedRoute><TodoComponent/></AuthenticatedRoute>}/>
       <Route path="login" element={<Login/>}/>
       <Route path="logout" element={<Logout/>}/>
       <Route path="*" element={<ErrorPage/>}/>
     </Routes>
     <Footer/>
    </Router>
  )
}

export default TodoApp


