const ActivityCard = ({ activity }) => {
  const items = activity?.length > 0 ? activity : [
    { label: "Completed React Interview", score: "88%", type: "good" },
    { label: "System Design round", score: "71%", type: "mid" },
    { label: "Behavioral round", score: "85%", type: "good" },
  ]

  return (
    <div
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(127,119,221,0.2)" }}
      className="rounded-xl p-5"
    >
      <h2
        style={{ color: "rgba(255,255,255,0.8)" }}
        className="text-sm font-medium mb-4"
      >
        Recent Sessions
      </h2>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            className="flex items-center justify-between py-2 last:border-0"
          >
            <p style={{ color: "rgba(255,255,255,0.85)" }} className="text-sm">
              {item.label}
            </p>
            <span
              style={
                item.type === "good"
                  ? { background: "rgba(29,158,117,0.15)", color: "#5DCAA5" }
                  : { background: "rgba(239,159,39,0.15)", color: "#EF9F27" }
              }
              className="text-xs px-3 py-1 rounded-full font-medium"
            >
              {item.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityCard