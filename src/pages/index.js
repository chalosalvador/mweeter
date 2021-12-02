import Head from "next/head";
import withAuth from "hocs/withAuth";
import CreatePost from "components/CreatePost";
import Feed from "components/Feed";
import { UserFollowsProvider } from "hooks/useUserFollows";

const Home = () => {
  return (
    <div>
      <Head>
        <title>mweeter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="font-bold text-xl mb-8">Your feed</div>

      <CreatePost />

      <UserFollowsProvider>
        <Feed />
        {/* recommendatiosn */}
      </UserFollowsProvider>
    </div>
  );
};

export default withAuth({ renderOnlyWhenAuthed: true })(Home);
