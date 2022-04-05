const { MongoClient } = require('mongodb');

const uri =
  'mongodb+srv://hyfuser:Test2022@cluster0.ogeb7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect(async (err) => {
  if (err) throw err;

  const collection = client.db('world').collection('city');

  const myCityWithName = await collection.findOne({ Name: 'Ankara' });
  console.log(myCityWithName);

  const myCityWithCountryCode = await collection.findOne({
    CountryCode: 'TR',
  });
  console.log(myCityWithCountryCode);

  client.close();
});