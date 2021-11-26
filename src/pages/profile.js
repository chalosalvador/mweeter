import Link from "next/link";
import withAuth from "hocs/withAuth";

const Profile = () => {
  return (
    <div>
      Profile
      <Link href="/">Home</Link>
    </div>
  );
};

export default withAuth({ renderOnlyWhenAuthed: true })(Profile);
