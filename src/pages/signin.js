import withAuth from "hocs/withAuth";
import Head from "next/head";
import Image from "next/image";
import GoogleSignInButton from "components/GoogleSignInButton";
import logo from "../../public/images/logo.svg";

const SignIn = () => {
  return (
    <div className="w-full h-screen flex justify-center">
      <Head>
        <title>mweeter - Sign In</title>
      </Head>

      <div className="flex flex-col justify-center text-center">
        <Image src={logo} width={48} height={48} alt="mweeter" />
        <div className="text-3xl font-bold mt-4 mb-10">mweeter</div>
        <GoogleSignInButton />
      </div>
    </div>
  );
};

export default withAuth({ renderOnlyWhenAuthed: false })(SignIn);
