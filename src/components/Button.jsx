import React from 'react'

export default function ({ label, color, onClick }) {
  return (
    <button style={{ color }} onClick={onClick}>
      {label}
    </button>
  )
}
