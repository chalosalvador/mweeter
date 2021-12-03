import { useRouter } from "next/router";
import withAuth from "hocs/withAuth";
import { useEffect, useState } from "react";
import { User } from "services/users";
import MweetSkeleton from "components/MweetSkeleton";
import Mweet from "components/Mweet";
import Image from "next/image";
import UserInfoSkeleton from "components/UserInfoSkeleton";
import UserHasNoMweets from "components/UserHasNoMweets";
import { UserFollowsProvider } from "hooks/useUserFollows";
import Head from "next/head";

const UserFeed = () => {
  const router = useRouter();
  const { displayName } = router.query;
  const [feed, setFeed] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const userSnap = await User.get(displayName);
      console.log("userSnap.data()", userSnap.data());
      setUserData(userSnap.data());
    };

    const onFeedChange = (snapshot) => {
      const newMweets = [];
      snapshot.forEach((doc) => {
        newMweets.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setFeed(newMweets);
    };

    let unsubscribeFeed;
    if (displayName) {
      unsubscribeFeed = User.subscribeFeedFromUsers(
        [displayName],
        onFeedChange
      );

      getUserData();
    }

    return () => {
      if (unsubscribeFeed) {
        unsubscribeFeed();
      }
    };
  }, [displayName]);

  const getContent = () => {
    if (!userData || !feed) {
      return new Array(10).fill(true).map((e, i) => <MweetSkeleton key={i} />);
    }

    if (feed.length === 0) {
      return (
        <UserFollowsProvider>
          <UserHasNoMweets displayName={displayName} />
        </UserFollowsProvider>
      );
    }

    return feed.map((mweet) => (
      <Mweet key={mweet.id} mweet={mweet} userData={userData} />
    ));
  };

  return (
    <div>
      <Head>
        <title>mweeter - {displayName}</title>
      </Head>

      {userData ? (
        <div className="flex items-center">
          <div className="mr-3 flex-shrink-0">
            <Image
              src={userData.photoURL}
              width={96}
              height={96}
              alt={displayName}
              className="rounded-full"
            />
          </div>
          <div>
            <div className="mr-2 font-semibold">
              {userData.firstName} {userData.lastName}
            </div>
            <div className="text-gray-400">@{userData.displayName}</div>
          </div>
        </div>
      ) : (
        <UserInfoSkeleton />
      )}

      <hr className="my-4 w-80" />

      <div className="mt-10">{getContent()}</div>
    </div>
  );
};

export default withAuth({ renderOnlyWhenAuthed: true })(UserFeed);
