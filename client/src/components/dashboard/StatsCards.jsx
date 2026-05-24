const StatsCards = ({ stats }) => {
  const data = [
    { title: "Total Interviews", value: stats?.interviews ?? 0, sub: "+3 this week" },
    { title: "Best Score", value: stats?.score ? `${stats.score}%` : "0%", sub: "Frontend role" },
    { title: "Resumes", value: stats?.resumes ?? 0, sub: "Uploaded" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((item, i) => (
        <div
          key={i}
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(127,119,221,0.2)" }}
          className="rounded-xl px-5 py-4"
        >
          <p style={{ color: "rgba(255,255,255,0.55)" }} className="text-xs uppercase tracking-wide">
            {item.title}
          </p>
          <p style={{ color: "#ffffff" }} className="text-2xl font-semibold mt-2">
            {item.value}
          </p>
          <p style={{ color: "rgba(175,169,236,0.8)" }} className="text-xs mt-1">
            {item.sub}
          </p>
        </div>
      ))}
    </div>
  )
}

export default StatsCards