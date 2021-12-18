import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import App from '../../components/speeckToText/App';
import ReactDOM from 'react-dom';

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
        <App />
    </main>
  )
}

export default IndexPage
