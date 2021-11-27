import withAuth from "hocs/withAuth";

const Following = () => {
  return <div className="font-bold text-xl">People you follow</div>;
};

export default withAuth({ renderOnlyWhenAuthed: true })(Following);
