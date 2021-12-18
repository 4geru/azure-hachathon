// @ts-check
//  <ImportConfiguration>
import {CosmosClient} from '@azure/cosmos'
const config = {
  endpoint: "https://db-papipuppe.documents.azure.com:443/",
  key: "4fhLeLEmknCy4yD1DHerBzC67Vp4BSTkgV3Uvb55YRVximlU3tq2WsllAGTSCUGhCd1AHHAjzcyUoaSbclyeFw",
  databaseId: "papipupedb",
  containerId: "Container1",
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
const newItem = {
  "id": "15",
  "Name": "Ryuppe",
  "Password": "papipu",
  "Sex": "Male",
  "DateOfBirth": "19920920",
  "_rid": "ODBJAMtEkikCAAAAAAAAAA==",
  "_self": "dbs/ODBJAA==/colls/ODBJAMtEkik=/docs/ODBJAMtEkikCAAAAAAAAAA==/",
  "_etag": "\"0500c829-0000-2300-0000-61bdbc7d0000\"",
  "_attachments": "attachments/",
  "_ts": 1639824509
}
//  </DefineNewItem>

export const main = async () => {
  
  // <CreateClientObjectDatabaseContainer>
  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  // Make sure Tasks database is already setup. If not, create it.
  await dbContextCreate(client, databaseId, containerId);
  // </CreateClientObjectDatabaseContainer>
  try {
    // <QueryItems>
    console.log(`Querying container: Items`);

    // query to return all items
    const querySpec = {
      query: "SELECT * from c"
    };
    
    // read all items in the Items container
    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();

    items.forEach(item => {
      console.log(`${item.id} - ${item.description}`);
    });
    // </QueryItems>
    
    // <CreateItem>
    /** Create new item
     * newItem is defined at the top of this file
     */
    const { resource: createdItem } = await container.items.create(newItem);
    
    console.log(`\r\nCreated new item: ${createdItem.id} - ${createdItem.description}\r\n`);
    // </CreateItem>
    
    // <UpdateItem>
    /** Update item
     * Pull the id and partition key value from the newly created item.
     * Update the isComplete field to true.
     */
    const { id, category } = createdItem;

    createdItem.isComplete = true;

    const { resource: updatedItem } = await container
      .item(id, category)
      .replace(createdItem);

    console.log(`Updated item: ${updatedItem.id} - ${updatedItem.description}`); 
    console.log(`Updated isComplete to ${updatedItem.isComplete}\r\n`);
    // </UpdateItem>
    
    // <DeleteItem>    
    /**
     * Delete item
     * Pass the id and partition key value to delete the item
     */
    // const { resource: result } = await container.item(id, category).delete();
    // console.log(`Deleted item with id: ${id}`);
    // </DeleteItem>  
    
  } catch (err) {
    console.log(err.message);
  }
}


export const read = async () => {
  
  // <CreateClientObjectDatabaseContainer>
  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  await dbContextCreate(client, databaseId, containerId);
  try {
    console.log(`Querying container: Items`);

    const querySpec = {
      query: "SELECT * from c"
    };
    
    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();
      debugger;
    return {items};
    
  } catch (err) {
    console.log(err.message);
  }
}
