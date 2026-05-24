const QuickActions = () => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border">

      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

      <div className="flex flex-col gap-3">
        <button className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
          Start Interview
        </button>

        <button className="border py-2 rounded-lg hover:bg-gray-100">
          Upload Resume
        </button>
      </div>

    </div>
  );
};

export default QuickActions;