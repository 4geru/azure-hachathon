// @ts-check

const config = {
  endpoint: "https://db-papipuppe.documents.azure.com:443/",
  key: "4fhLeLEmknCy4yD1DHerBzC67Vp4BSTkgV3Uvb55YRVximlU3tq2WsllAGTSCUGhCd1AHHAjzcyUoaSbclyeFw==",
  databaseId: "papipupedb",
  containerId: "Container1",
  partitionKey: { kind: "Hash", paths: ["/category"] }
};

module.exports = config;
