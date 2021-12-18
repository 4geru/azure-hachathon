import * as React from "react"
import { useState, useEffect } from "react"
import { main, read } from '@lib/cosmoDb'

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

// markup
const IndexPage = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const {items} = read();
    debugger
    setItems(items)
  }, [items])

  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      hoge
    </main>
  )
}

export default IndexPage
