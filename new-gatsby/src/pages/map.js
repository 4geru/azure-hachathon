import * as React from "react"
import {AzureMap, AzureMapsProvider, AzureMapPopup} from 'react-azure-maps'
import {AuthenticationType} from 'azure-maps-control'

const option = {
  authOptions: {
      authType: AuthenticationType.subscriptionKey,
      subscriptionKey: 'BoTVzUuM7aQCPMAAtfDWGkNci2eKKFaAjdHaX4Zkwa4' // Your subscription key
  },
  center: [139.7005319, 35.6048821],
  zoom: 10,
}

const heart = {
  width: "100px",  /* 正方形を作る */
  height: "100px", /* 正方形を作る */
  position: "relative"/* 基準位置とする */
  // .heart::before,
// .heart::after {
//   content: "";  /* 疑似要素に必須 */
//   width: 50%;   /* ハートの丸い部分の大きさにかかわる */
//   height: 80%;  /* ハートの高さにかかわる */
//   background: #E0548E; /* ハートの色 */
//   border-radius: 25px 25px 0 0; /* ハートの半円を生成 */
//   display: block; /* ブロック要素にする */
//   position: absolute; /* 相対位置に指定 */
// }
}

// .heart::before {
//   transform: rotate(-45deg); /* 左に回転 */
//   left: 14%;                 /* 左からの位置を指定 */
// }
// .heart::after {
//   transform: rotate(45deg);  /* 右に回転 */
//   right: 14%;                /* 右からの位置を指定 */
// }

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
      <AzureMapsProvider>
        <div style={{ height: '600px', width: "800px" }}>
          <AzureMap options={option}>

            <AzureMapPopup
              isVisible={true}
              options={{
                // ...popupOptions,
                position: [139.7005319, 35.6048821],
                // pixelOffset: [0, -18],
              }}
              popupContent={
                <div style={heart}></div>
              }
            />  
          </AzureMap>
        </div>
      </AzureMapsProvider>
    </main>
  )
}

export default IndexPage
