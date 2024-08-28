import React from 'react'

export default function Paganation({goToNextPage,goToPrevPage}) {
  return (
    <div>
      {goToPrevPage && <button className="buttons" onClick={goToPrevPage}>Prev</button>} 
      <button className="buttons" onClick={goToNextPage}>Next</button>
    </div>
  )
}
