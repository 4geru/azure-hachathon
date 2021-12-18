// @ts-check
//  <ImportConfiguration>
import {CosmosClient} from '@azure/cosmos'
const config = {
  endpoint: "https://db-papipuppe.documents.azure.com:443/",
  key: "4fhLeLEmknCy4yD1DHerBzC67Vp4BSTkgV3Uvb55YRVximlU3tq2WsllAGTSCUGhCd1AHHAjzcyUoaSbclyeFw",
  databaseId: "papipupedb",
  containerId: "emotionContainer",
  partitionKey: { kind: "Hash", paths: ["/category"] }
};
// const dbContext = require("./data/databaseContext");
const dbContextCreate = async (client, databaseId, containerId) => {
  const partitionKey = config.partitionKey;

  /**
   * Create the database if it does not exist
   */
  const { database } = await client.databases.createIfNotExists({
    id: databaseId
  });
  console.log(`Created database:\n${database.id}\n`);

  /**
   * Create the container if it does not exist
   */
  const { container } = await client
    .database(databaseId)
    .containers.createIfNotExists(
      { id: containerId, partitionKey },
      { offerThroughput: 400 }
    );

  console.log(`Created container:\n${container.id}\n`);
}
//  </ImportConfiguration>

//  <DefineNewItem>
// const newItem = {
//   "Date": "1",
//   "User": "",
//   "Lat": "",
//   "Lng": "",
//   "DocumentText": "",
//   "OverallSentiment": "",
//   "SentimentConfidenceScores": {
//       "positive": "",
//       "neutral": "",
//       "negative": ""
//   },
// }
//  </DefineNewItem>

export const readToEmotionContainer = async () => {
  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);
  const querySpec = {
    query: "SELECT * from c"
  };

  // read all items in the Items container
  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
  items.forEach(item => {
    console.log(`${item.id} - ${item.DocumentText}`);
  });
}

export const writeToEmotionContainer = async (newItem) => {
  // <CreateClientObjectDatabaseContainer>
  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  // Make sure Tasks database is already setup. If not, create it.
  await dbContextCreate(client, databaseId, containerId);
  // </CreateClientObjectDatabaseContainer>
  try {
    const { resource: createdItem } = await container.items.create(newItem);
    
    console.log(`\r\nCreated new item: ${createdItem.id} - ${createdItem.description}\r\n`);
    return true
  } catch (err) {
    console.log(err.message);
  }
}
