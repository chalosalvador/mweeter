import Head from "next/head";
import withAuth from "hocs/withAuth";

const Home = () => {
  return (
    <div>
      <Head>
        <title>mweeter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="font-bold text-xl">Your feed</div>
    </div>
  );
};

export default withAuth({ renderOnlyWhenAuthed: true })(Home);
