import Head from "next/head";
import withAuth from "hocs/withAuth";
import CreatePost from "components/CreatePost";
import Feed from "components/Feed";
import { UserFollowsProvider } from "hooks/useUserFollows";
import RecommendationsList from "components/RecommendationsList";

const Home = () => {
  return (
    <div>
      <Head>
        <title>mweeter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="font-bold text-xl mb-8">Your feed</div>

      <UserFollowsProvider>
        <div className="flex">
          <div className="w-2/3 mr-20">
            <div className="mb-10">
              <CreatePost />
            </div>

            <Feed />
          </div>

          <div className="w-1/3">
            <RecommendationsList />
          </div>
        </div>
      </UserFollowsProvider>
    </div>
  );
};

export default withAuth({ renderOnlyWhenAuthed: true })(Home);
