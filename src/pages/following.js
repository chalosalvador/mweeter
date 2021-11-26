import withAuth from "hocs/withAuth";

const Following = () => {
  return <div>Following</div>;
};

export default withAuth({ renderOnlyWhenAuthed: true })(Following);
