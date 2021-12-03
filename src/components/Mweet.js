import Image from "next/image";
import Link from "next/link";
import MweetDate from "components/MweetDate";
import PropTypes from "prop-types";

const Mweet = ({ mweet, userData }) => {
  return (
    <div key={mweet.id} className="flex mb-10">
      <div className="mr-3 flex-shrink-0">
        <Image
          src={userData.photoURL}
          width={32}
          height={32}
          alt={mweet.uid}
          className="rounded-full"
        />
      </div>

      <div className="text-gray-500">
        <div className="mb-1 flex">
          <span className="text-gray-800 font-semibold mr-2 cursor-pointer">
            <Link href={`/user/${userData.displayName}`} passHref>
              <span>
                {userData.firstName} {userData.lastName}
              </span>
            </Link>
          </span>

          <span className="mr-2 cursor-pointer">
            <Link href={`/user/${userData.displayName}`} passHref>
              <span>@{mweet.uid}</span>
            </Link>
          </span>
          <span className="mr-2 font-bold">&bull;</span>
          <MweetDate dateInSeconds={mweet.createdAt?.seconds} />
        </div>

        <div>{mweet.text}</div>
      </div>
    </div>
  );
};

Mweet.propTypes = {
  mweet: PropTypes.shape({
    id: PropTypes.string,
    uid: PropTypes.string,
    text: PropTypes.string,
    createdAt: PropTypes.shape({
      seconds: PropTypes.number,
      nanoseconds: PropTypes.number,
    }),
  }),
  userData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    displayName: PropTypes.string,
    uid: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};

export default Mweet;
