import * as React from "react"
import {AzureMap, AzureMapsProvider, AzureMapPopup} from 'react-azure-maps'
import {AuthenticationType} from 'azure-maps-control'
import styled from 'styled-components'

const option = {
  authOptions: {
      authType: AuthenticationType.subscriptionKey,
      subscriptionKey: 'BoTVzUuM7aQCPMAAtfDWGkNci2eKKFaAjdHaX4Zkwa4' // Your subscription key
  },
  center: [139.7005319, 35.6048821],
  zoom: 10,
}

// ref: https://qiita.com/7note/items/3b640d031e83f82a81c1
const Heart = styled.div`
  width: 50px;
  height: 50px;
  position: relative;

  &::before,
  &::after {
    content: "";
    width: 50%;
    height: 80%;
    background: ${props => props.isPositive ? '#E0548E' : '#5dadec'};
    border-radius: 25px 25px 0 0;
    display: block;
    position: absolute;
  }
  &::before {
    transform: rotate(-45deg);
    left: 14%;
  }
  &::after {
    transform: rotate(45deg);
    right: 14%;
  }
`
const StyledAzureMapPopup = styled(AzureMapPopup)`
> .popup-content-container {
  box-shadow: none !important;
}
`
// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const Marker = ({lat, lon, isPositive}) => {
  return (
    <StyledAzureMapPopup
      isVisible={true}
      boxShadow={'none'}
      options={{
        position: [lat, lon],
        closeButton: false,
        fillColor: 'transparent',
        boxShadow: 'none',
        style:{
          boxShadow: 'none'
        }
      }}
      popupContent={
        <Heart isPositive={isPositive} />
      }
      style={{
        boxShadow: 'none'
      }}
    />  
  )
}

// markup
const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <AzureMapsProvider>
        <div style={{ height: '600px', width: "800px" }}>
          <AzureMap options={option}>
            <Marker lat={139.7005319} lon={35.6048821} isPositive={true} />
            <Marker lat={139.8005319} lon={35.6048821} isPositive={false} />
          </AzureMap>
        </div>
      </AzureMapsProvider>
    </main>
  )
}

export default IndexPage
