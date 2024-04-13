import session from "express-session";
import MongoDBStore from "connect-mongodb-session";

const MongoDBStoreSession = MongoDBStore(session);

const store = new MongoDBStoreSession({
  uri: "mongodb://localhost:27017/session-store", // MongoDB connection URI
  collection: "sessions",
});

store.on("error", function (error) {
  console.error("Session store error:", error);
});

export default store;
