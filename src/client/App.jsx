/**
 * This is the react app entry point for the client side.
 */
import React from 'react'
import config from '../config'

const apiUrl = config.apiUrl

export default function App({}) {
  const [msg, setMsg] = React.useState('')

  React.useEffect(() => {
    fetch(`${apiUrl}`)
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
