import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome to Coachly!
        </h1>
        <div className="space-y-4">
          <Link
            href="/coach/dashboard"
            className="block w-full py-3 px-4 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Enter as a Coach
          </Link>
          <Link
            href="/student/dashboard"
            className="block w-full py-3 px-4 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors"
          >
            Enter as a Student
          </Link>
        </div>
      </div>
    </div>
  );
}
