import mongoose from "mongoose";

const connect = async () => {
  try {
    console.log("Conectando ao DataBase...");
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Conectado ao DataBase!")
  } catch (error) {
    console.log("Fail DataBase Error", error.message);
    process.exit(1);
  }
};

export default connect;
