import { useAuth } from "hooks/useAuth";
import withAuth from "hocs/withAuth";

const SignIn = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="w-full h-screen flex justify-center">
      <div>
        <button
          className="border border-blue-300 shadow rounded-md p-4"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default withAuth({ renderOnlyWhenAuthed: false })(SignIn);
