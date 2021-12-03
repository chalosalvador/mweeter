import Image from "next/image";
import { useAuth } from "hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import Button from "components/Button";
import { useState } from "react";
import { User } from "services/users";
import { toast } from "react-toastify";

const schema = yup
  .object({
    text: yup
      .string()
      .max(240, "Max 160 characters")
      .typeError("Input the text of your mweet")
      .required("Input the text of your mweet"),
  })
  .required();

const CreatePost = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const onSubmit = async ({ text }) => {
    setLoading(true);
    await User.addMweet(user.displayName, text).catch((e) => {
      console.error("The was an error :(, please try again.", e);
      toast.error("The was an error :( please try again.", {
        toastId: "error_send_mweet",
        position: "top-center",
      });
      setLoading(false);
    });
    reset();
    setLoading(false);
  };

  return (
    <div className="flex">
      <div>
        <Image
          src={user.photoURL}
          width={45}
          height={45}
          alt={user.displayName}
          className="rounded-full"
        />
      </div>

      <div className="w-full ml-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea className="w-full" {...register("text")} />
          {/*<p className="text-red-500">{errors.text?.message}</p>*/}

          <div className="flex justify-end">
            <Button
              className="btn-primary mt-4 px-8"
              disabled={!isValid || loading}
              loading={loading}
            >
              Send mweet
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
