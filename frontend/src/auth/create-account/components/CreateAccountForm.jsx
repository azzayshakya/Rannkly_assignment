import { Link } from "react-router-dom";
import { useDefineCreateAccountForm } from "../hooks/useDefineLoginForm";
import { useCreateAccountMutation } from "../hooks/useCreateAccountMutation";

const CreateAccountForm = () => {
  // const navigate = useNavigate();
  const { form, errors } = useDefineCreateAccountForm();
  const { submitLoginMutation, isSubmitting } = useCreateAccountMutation();

  const onSubmit = (data) => {
    submitLoginMutation(data);
  };

  return (
    <div>
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Create New Account
        </h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            
            <label className="mb-1 block text-sm text-gray-400">Email</label>
            <input
              type="email"
              {...form.register("email")}
              className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            
            <label className="mb-1 block text-sm text-gray-400">Name</label>
            <input
              type="text"
              {...form.register("name")}
              className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            
            <label className="mb-1 block text-sm text-gray-400">Number</label>
            <input
              type="number"
              {...form.register("number")}
              className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your number"
            />
            {errors.number && (
              <p className="mt-1 text-sm text-red-500">
                {errors.number.message}
              </p>
            )}
          </div>

          

          <div>
            <label className="mb-1 block text-sm text-gray-400">Password</label>
            <input
              type="password"
              {...form.register("password")}
              className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccountForm;
