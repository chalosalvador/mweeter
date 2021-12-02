import { useEffect, useState } from "react";
import { User } from "services/users";
import { useUserFollows } from "hooks/useUserFollows";
import RecommendedItem from "components/RecommendedItem";
import UserInfoSkeleton from "components/UserInfoSkeleton";

const RecommendationsList = () => {
  const [recommendations, setRecommendations] = useState(null);
  const { displayNames } = useUserFollows();

  useEffect(() => {
    const onRecommendationsChange = (snapshot) => {
      const newRecommendations = [];
      snapshot.forEach((doc) => {
        newRecommendations.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setRecommendations(newRecommendations);
    };

    let unsubscribeRecommendations;
    if (displayNames?.length > 0) {
      unsubscribeRecommendations = User.subscribeRecommendations(
        displayNames,
        onRecommendationsChange
      );
    }

    return () => {
      if (unsubscribeRecommendations) {
        unsubscribeRecommendations();
      }
    };
  }, [displayNames]);

  const showRecommendations = () => {
    return recommendations.length > 0 ? (
      recommendations.map((user) => (
        <RecommendedItem key={user.id} user={user} />
      ))
    ) : (
      <div className="text-gray-400 text-center w-64">
        No more users to follow. <br /> You&apos;ve got lots of friends ;)
      </div>
    );
  };

  const renderContent = () => {
    return recommendations
      ? showRecommendations()
      : new Array(3).fill(true).map((_, i) => <UserInfoSkeleton key={i} />);
  };

  return (
    <div>
      <div className="font-bold text-lg mb-2">Follow Others</div>

      {renderContent()}
    </div>
  );
};

export default RecommendationsList;
