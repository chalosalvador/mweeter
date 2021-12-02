import { useEffect, useState } from "react";
import { User } from "services/users";
import { useUserFollows } from "hooks/useUserFollows";
import MweetSkeleton from "components/MweetSkeleton";
import Mweet from "components/Mweet";

const Feed = () => {
  const [feed, setFeed] = useState(null);
  const { usersData, displayNames } = useUserFollows();

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

    let unsubscribeFeed;
    if (displayNames?.length > 0) {
      unsubscribeFeed = User.subscribeFeedFromUsers(displayNames, onFeedChange);
    }

    return () => {
      if (unsubscribeFeed) {
        unsubscribeFeed();
      }
    };
  }, [displayNames]);

  if (!usersData || !feed) {
    return new Array(10).fill(true).map((e, i) => <MweetSkeleton key={i} />);
  }

  if (feed.length === 0) {
    return (
      <div className="text-gray-400 text-center">
        No Mweets in your feed.
        <br /> Try making some friends and follow others <br /> or start writing
        your first Mweet.
      </div>
    );
  }

  return feed.map((mweet) => (
    <Mweet key={mweet.id} mweet={mweet} userData={usersData[mweet.uid]} />
  ));
};

export default Feed;
