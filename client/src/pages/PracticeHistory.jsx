import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const PracticeHistory = () => {
  const { user } = useAuth();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/history/${user.id}`
        );

        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchHistory();
    }
  }, [user]);

  const getScoreColor = (score) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  if (loading) {
    return (
      <div
        style={{
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
          fontSize: "18px",
        }}
      >
        Loading History...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 24px",
      }}
    >
     {/* Hero Section */}
<div style={{ marginBottom: "45px" }}>
  <p
    style={{
      color: "#7F77DD",
      fontSize: "13px",
      fontWeight: "600",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      marginBottom: "10px",
    }}
  >
    Interview Analytics
  </p>

  <h1
    style={{
      color: "#fff",
      fontSize: "42px",
      fontWeight: "700",
      lineHeight: "1.15",
      margin: 0,
    }}
  >
    Your Interview Journey..
  </h1>

  <p
    style={{
      color: "rgba(255,255,255,0.55)",
      fontSize: "16px",
      marginTop: "14px",
      maxWidth: "650px",
      lineHeight: "1.7",
    }}
  >
    Review every mock interview, analyze your performance, identify
    improvement areas, and track your growth toward becoming
    interview-ready.
  </p>
  
</div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "16px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "rgba(127,119,221,0.12)",
            border: "1px solid rgba(127,119,221,0.2)",
            borderRadius: "16px",
            padding: "20px",
          }}
        >
          <p style={{ color: "#AFA9EC", margin: 0 }}>Total Interviews</p>
          <h2 style={{ color: "#fff", marginTop: "8px" }}>
            {history.length}
          </h2>
        </div>

        <div
          style={{
            background: "rgba(127,119,221,0.12)",
            border: "1px solid rgba(127,119,221,0.2)",
            borderRadius: "16px",
            padding: "20px",
          }}
        >
          <p style={{ color: "#AFA9EC", margin: 0 }}>Average Score</p>
          <h2 style={{ color: "#fff", marginTop: "8px" }}>
            {history.length
              ? Math.round(
                  history.reduce((a, b) => a + b.score, 0) / history.length
                )
              : 0}
            /100
          </h2>
        </div>
      </div>

      {/* Empty State */}
      {history.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            borderRadius: "20px",
            background: "rgba(127,119,221,0.08)",
            border: "1px solid rgba(127,119,221,0.15)",
          }}
        >
          <h2 style={{ color: "#fff" }}>No Interviews Yet</h2>
          <p style={{ color: "rgba(255,255,255,0.5)" }}>
            Complete your first interview to start tracking progress.
          </p>
        </div>
      )}

      {/* History Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        {history.map((item) => (
          <div
            key={item._id}
            style={{
              background: "rgba(127,119,221,0.12)",
              border: "1px solid rgba(127,119,221,0.2)",
              borderRadius: "18px",
              padding: "22px",
              transition: "0.3s",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <h2
                  style={{
                    color: "#fff",
                    margin: 0,
                    textTransform: "capitalize",
                  }}
                >
                  ⚡ {item.role} Interview
                </h2>

                <p
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    marginTop: "6px",
                    marginBottom: 0,
                  }}
                >
                  📅{" "}
                  {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div
                style={{
                  background: getScoreColor(item.score),
                  color: "#fff",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  fontWeight: "700",
                }}
              >
                {item.score}/100
              </div>
            </div>

            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                lineHeight: "1.7",
                marginTop: "18px",
              }}
            >
              {item.feedback
                ?.replace("INTERVIEW_COMPLETE", "")
                .slice(0, 140)}
              ...
            </p>

            <button
              onClick={() => setSelectedFeedback(item)}
              style={{
                marginTop: "10px",
                background: "#7F77DD",
                border: "none",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              View Full Feedback →
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedFeedback && (
        <div
          onClick={() => setSelectedFeedback(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#121225",
              width: "100%",
              maxWidth: "700px",
              borderRadius: "18px",
              padding: "24px",
              border: "1px solid rgba(127,119,221,0.3)",
            }}
          >
            <h2
              style={{
                color: "#fff",
                textTransform: "capitalize",
              }}
            >
              {selectedFeedback.role} Interview Feedback
            </h2>

            <p
              style={{
                color: "#AFA9EC",
              }}
            >
              Score: {selectedFeedback.score}/100
            </p>

            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                lineHeight: "1.8",
                whiteSpace: "pre-wrap",
              }}
            >
              {selectedFeedback.feedback.replace(
                "INTERVIEW_COMPLETE",
                ""
              )}
            </p>

            <button
              onClick={() => setSelectedFeedback(null)}
              style={{
                marginTop: "20px",
                background: "#7F77DD",
                color: "#fff",
                border: "none",
                padding: "12px 18px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeHistory;