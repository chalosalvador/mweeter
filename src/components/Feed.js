import { useEffect, useState } from "react";
import { User } from "services/users";
import { useUserFollows } from "hooks/useUserFollows";
import MweetSkeleton from "components/MweetSkeleton";
import Mweet from "components/Mweet";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const { usersData } = useUserFollows();

  console.log("usersData", JSON.stringify(usersData));

  useEffect(() => {
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
    const unsubscribeFeed = User.subscribeFeed(onFeedChange);

    return () => {
      unsubscribeFeed();
    };
  }, []);

  return feed.map((mweet) =>
    usersData ? (
      <Mweet key={mweet.id} mweet={mweet} userData={usersData[mweet.uid]} />
    ) : (
      <MweetSkeleton key={mweet.id} />
    )
  );
};

export default Feed;
