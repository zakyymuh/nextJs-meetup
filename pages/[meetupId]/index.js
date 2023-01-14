import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
   <Fragment>
    <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}/>
    </Head>
    <MeetupDetail
      title={props.meetupData.title}
      id={props.meetupData.id}
      description={props.meetupData.description}
      address={props.meetupData.address}
      image={props.meetupData.image}
    />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://zakyymuh:zdVGE8SbVFomwAm6@react-course.05ws9xx.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  return {
    fallback: true,
    paths: meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() } })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
console.log(meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://zakyymuh:zdVGE8SbVFomwAm6@react-course.05ws9xx.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  console.log(selectedMeetup);

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
      },
    },
  };
};

export default MeetupDetails;
