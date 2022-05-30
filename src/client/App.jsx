import React from 'react'
const API_URL = process.env.API_URL

export default function App({}) {
  const [msg, setMsg] = React.useState('')

  React.useEffect(() => {
    fetch(`http://localhost:8080/api`)
      .then(res => res.text())
      .then(data => setMsg(data))
  }, [])

  return (
    <>
      <h1>hello, app</h1>
      {msg ? <p>{msg}</p> : ''}
    </>
  )
}

