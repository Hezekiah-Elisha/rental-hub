import { useEffect } from 'react'
import React, { useEffect } from 'react'

export default function Error({error, reset}) {
    useEffect(() => {
        console.error(error)
    }, [error])
  return (
    <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <button onClick={reset}>Reset</button>
    </div>
  )
}
