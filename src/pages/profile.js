import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import withAuth from "hocs/withAuth";
import TextInput from "components/TextInput";
import { useAuth } from "hooks/useAuth";
import { User } from "services/users";
import { useState } from "react";
import Button from "components/Button";
import { auth } from "services";
import { Routes } from "constants/routes";

const schema = yup
  .object({
    firstName: yup
      .string()
      .typeError("Enter your first name")
      .required("Enter your first name"),
    lastName: yup
      .string()
      .typeError("Enter your last name")
      .required("Enter your last name"),
    displayName: yup
      .string()
      .matches(/^[a-z0-9_]+$/, {
        message: "Only lowercase letters, numbers and underscore",
      })
      .typeError("Enter your username")
      .required("Enter your username"),
  })
  .required();

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: user,
  });
  const onSubmit = async ({ firstName, lastName, displayName }) => {
    setLoading(true);
    try {
      const newUserData = {
        ...user,
        firstName,
        lastName,
      };

      if (!user.displayName) {
        newUserData.displayName = displayName;
      }

      await User.save(displayName, newUserData);
      await updateProfile(auth.currentUser, { displayName });
      if (!user.displayName) {
        // force a complete reload when new user to set new user data
        window.location.href = Routes.HOME;
      }
    } catch (e) {
      toast.error("Could not update profile. Try with a different handle.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="font-bold text-lg">Your Profile</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <TextInput
            register={{ ...register("firstName") }}
            label="First name"
            errors={errors.firstName?.message}
            className="mr-5"
          />

          <TextInput
            register={{ ...register("lastName") }}
            label="Last name"
            errors={errors.lastName?.message}
          />
        </div>

        <div className="w-80">
          {user.displayName ? (
            <TextInput
              label="Your handle (username)"
              disabled
              value={user.displayName}
              className="w-full"
            />
          ) : (
            <TextInput
              register={{ ...register("displayName") }}
              label="Your handle (username)"
              errors={errors.displayName?.message}
              className="w-full"
            />
          )}

          <TextInput
            label="Email address"
            value={user.email}
            disabled
            className="w-full"
          />
        </div>

        <Button className="mt-5 btn-primary" disabled={loading}>
          Update info
        </Button>
      </form>
    </div>
  );
};

export default withAuth({ renderOnlyWhenAuthed: true })(Profile);
