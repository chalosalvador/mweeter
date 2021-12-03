import Image from "next/image";
import { useAuth } from "hooks/useAuth";
import google from "../../public/images/Google_Logo.svg";

const GoogleSignInButton = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <button
      className="border border-gray-300 shadow rounded-md px-5 py-2 flex items-center"
      onClick={signInWithGoogle}
    >
      <span className="h-6">
        <Image src={google} alt="" width={24} height={24} />
      </span>
      <span className="ml-3 text-lg text-gray-400">Sign In with Google</span>
    </button>
  );
};

export default GoogleSignInButton;
