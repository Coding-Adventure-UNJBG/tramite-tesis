import React from 'react'

function Card({ children }) {
  return (
    <div className="bg-white shadow-md rounded overflow-hidden w-full mt-1 mb-4">
      {children}
    </div>
  )
}

export default Card