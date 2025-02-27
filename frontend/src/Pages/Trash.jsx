import React from 'react'
import { useAuth } from '../Context/useAuth'

export default function Trash() {
  const {trash,trashData}=useAuth();
  return (
    <div style={{textAlign:"center"}}>
      {trash ?
      <div>
        {
          trashData.map((item)=><div key={item._id}>{item.name}</div>)
        }
      </div>
      :<span>No Items in Your Trash</span>}

    </div>
  )
}
