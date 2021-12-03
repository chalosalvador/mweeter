import withAuth from "hocs/withAuth";
import Head from "next/head";
import { UserFollowsProvider } from "hooks/useUserFollows";
import FollowingList from "components/FollowingList";

const Following = () => {
  return (
    <>
      <Head>
        <title>mweeter</title>
      </Head>
      <div className="font-bold text-xl">People you follow</div>
      <UserFollowsProvider>
        <FollowingList />
      </UserFollowsProvider>
    </>
  );
};

export default withAuth({ renderOnlyWhenAuthed: true })(Following);
