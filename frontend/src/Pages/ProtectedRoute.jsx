import React, { Children } from 'react'
import { useAuth } from '../Context/useAuth'
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const {isAuthenticated}=useAuth();
    const navigate=useNavigate();
    if(!isAuthenticated){
        navigate('/login');
    }
  return (
   <>
    {isAuthenticated ? children :null}
   </>
  )
}
