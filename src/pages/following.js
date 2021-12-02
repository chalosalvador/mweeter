import withAuth from "hocs/withAuth";
import Head from "next/head";

const Following = () => {
  return (
    <>
      <Head>
        <title>mweeter</title>
      </Head>
      <div className="font-bold text-xl">People you follow</div>;
    </>
  );
};

export default withAuth({ renderOnlyWhenAuthed: true })(Following);
