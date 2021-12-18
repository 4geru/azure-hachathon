import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { SpeechInput } from '@components/speeckToText/SpeechInput';

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <title>Home Page</title>
        <SpeechInput />
    </main>
  )
}

export default IndexPage
