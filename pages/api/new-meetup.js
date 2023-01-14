import { MongoClient } from "mongodb";
//api/new-meetup
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://zakyymuh:zdVGE8SbVFomwAm6@react-course.05ws9xx.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "New meetup is created!" });
  }
};

export default handler;
