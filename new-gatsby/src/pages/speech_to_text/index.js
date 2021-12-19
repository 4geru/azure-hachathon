import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { SpeechInput } from '@components/speeckToText/SpeechInput';
import Layout from "@components/layout"

const IndexPage = () => {
  return (
    <Layout>
      <title>Home Page</title>
      <SpeechInput />
    </Layout>
  )
}

export default IndexPage
