import session from "express-session";
import MongoDBStore from "connect-mongodb-session";

const MongoDBStoreSession = MongoDBStore(session);

const store = new MongoDBStoreSession({
  uri: process.env.MONGO_URI, 
  databaseName: "session-store", 
  collection: "Exclusive",
});

store.on("error", function (error) {
  console.error("Session store error:", error);
});

export default store;
