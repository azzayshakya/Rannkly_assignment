export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
    

      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="max-w-md mb-6 text-gray-600">
          Create an account or log in to start managing your tasks. Admins,
          Managers, and Employees have different permissions to keep things
          organized.
        </p>

        <div className="flex space-x-4">
          <a
            href="/register"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </a>
          <a
            href="/login"
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </a>
        </div>
      </main>

    </div>
  );
}
