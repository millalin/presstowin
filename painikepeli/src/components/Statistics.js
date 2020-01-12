import React from 'react'


const Statistics = ({ points }) => {

    if (points === 0) {
      return (
        <div>
          <h2>You have zero points</h2>
          <p>If you want to start over, press 'Play'</p>
        </div>
      )
    }
  
    return (
      <div>
        <h2>Score</h2>
        <div>
          Your current points: {points}
        </div>
  
      </div>
    )
  }


  export default Statistics