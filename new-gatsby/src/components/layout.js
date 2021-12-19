import React from "react"

const pageStyles = {
  color: "#232129",
  backgroundColor: "#FEAE00",
  padding: "50px 10px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  height: "100vh"
}

export default function Layout({ children }) {
  return (
    <div style={pageStyles}>
      {children}
    </div>
  )
}
