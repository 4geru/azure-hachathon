import * as React from "react"
import { main } from '@lib/cosmoDb'

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

// markup
const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <button onClick={main}>
        hoge
      </button>
    </main>
  )
}

export default IndexPage
