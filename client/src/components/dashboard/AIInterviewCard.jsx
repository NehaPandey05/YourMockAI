const AIInterviewCard = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">

      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        AI Mock Interview
      </h2>

      <p className="text-gray-500 text-sm mb-6">
        Practice real interview questions with instant AI feedback.
      </p>

      <div className="flex justify-between items-center">
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
          Start Now
        </button>

        <span className="text-sm text-gray-400">
          12 sessions done
        </span>
      </div>

    </div>
  );
};

export default AIInterviewCard;