
import { useState, useEffect } from "react"

const SetupStage = ({ role, setRole, setStage }) => {
  const roles = [
    { id: "frontend", icon: "⚡", name: "Frontend", desc: "React, CSS, JavaScript" },
    { id: "backend", icon: "⚙️", name: "Backend", desc: "Node.js, APIs, Databases" },
    { id: "fullstack", icon: "🔗", name: "Fullstack", desc: "End-to-end development" },
  ]

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", paddingTop: 40 }}>
      <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 500, marginBottom: 8 }}>
        Choose your role
      </h1>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 28 }}>
        AI will tailor questions specifically for you
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {roles.map((r) => (
          <div
            key={r.id}
            onClick={() => setRole(r.id)}
            style={{
              background: role === r.id ? "rgba(127,119,221,0.25)" : "rgba(127,119,221,0.08)",
              border: `1px solid ${role === r.id ? "rgba(127,119,221,0.6)" : "rgba(127,119,221,0.2)"}`,
              borderRadius: 12,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 24 }}>{r.icon}</div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, fontWeight: 500, margin: 0 }}>
                {r.name}
              </p>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, margin: 0 }}>
                {r.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => role && setStage("interview")}
        style={{
          width: "100%",
          background: role ? "#7F77DD" : "rgba(127,119,221,0.3)",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: "14px",
          fontSize: 15,
          fontWeight: 500,
          cursor: role ? "pointer" : "not-allowed",
        }}
      >
        {role ? `Start ${role} Interview →` : "Select a role first"}
      </button>
    </div>
  )
}


const InterviewStage = ({ role, messages, setMessages, currentReply, setCurrentReply, answer, setAnswer, isLoading, setIsLoading, setStage, isComplete, setIsComplete }) => {
const [isListening, setIsListening] = useState(false)
  useEffect(() => {
  const startInterview = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/interview/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          messages: [{ role: "user", content: "Start the interview, ask me the first question." }]
        })
      })
      const data = await res.json()
      setCurrentReply(data.reply)
      setMessages([
        { role: "user", content: "Start the interview, ask me the first question." },
        { role: "assistant", content: data.reply }
      ])
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }
  startInterview()
}, [])
  const sendAnswer = async () => {
    if (!answer.trim() || isLoading) return

    const newMessages = [...messages, { role: "user", content: answer }]
    setMessages(newMessages)
    setAnswer("")
    setIsLoading(true)

    try {
      const res = await fetch("http://localhost:5000/api/interview/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, messages: newMessages })
      })
      const data = await res.json()
      setCurrentReply(data.reply)
      setMessages([...newMessages, { role: "assistant", content: data.reply }])
      if (data.isComplete) {
        setIsComplete(true)
        setStage("done")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }
  const startListening = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SpeechRecognition) {
    alert("Your browser doesn't support speech recognition. Try Chrome.")
    return
  }

  const recognition = new SpeechRecognition()
  recognition.lang = "en-US"
  recognition.interimResults = false

  setIsListening(true)

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    setAnswer(prev => prev ? prev + " " + transcript : transcript)
    setIsListening(false)
  }

  recognition.onerror = () => setIsListening(false)
  recognition.onend = () => setIsListening(false)

  recognition.start()
}

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", paddingTop: 32 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 500, margin: 0 }}>
          {role.charAt(0).toUpperCase() + role.slice(1)} Interview
        </h2>
        <span style={{ color: "rgba(175,169,236,0.8)", fontSize: 13, background: "rgba(127,119,221,0.15)", padding: "4px 12px", borderRadius: 20 }}>
          {messages.filter(m => m.role === "assistant").length} / 5 questions
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20, minHeight: 300 }}>
        {messages.length === 0 && !isLoading && (
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, textAlign: "center", paddingTop: 60 }}>
            Starting your interview...
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              background: m.role === "assistant" ? "rgba(127,119,221,0.15)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${m.role === "assistant" ? "rgba(127,119,221,0.25)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 12,
              padding: "12px 16px",
              fontSize: 14,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.6,
              marginLeft: m.role === "user" ? 40 : 0,
              marginRight: m.role === "assistant" ? 40 : 0,
            }}
          >
            <p style={{ margin: 0, fontSize: 11, color: m.role === "assistant" ? "rgba(175,169,236,0.7)" : "rgba(255,255,255,0.3)", marginBottom: 6 }}>
              {m.role === "assistant" ? "🤖 Interviewer" : "👤 You"}
            </p>
            {m.content}
          </div>
        ))}
        {isLoading && (
          <div style={{ background: "rgba(127,119,221,0.15)", border: "1px solid rgba(127,119,221,0.25)", borderRadius: 12, padding: "12px 16px", color: "rgba(175,169,236,0.6)", fontSize: 14 }}>
            🤖 Interviewer is thinking...
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          rows={4}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(127,119,221,0.2)",
            borderRadius: 12,
            padding: "12px 16px",
            color: "rgba(255,255,255,0.85)",
            fontSize: 14,
            resize: "none",
            outline: "none",
            lineHeight: 1.6,
          }}
        />
        <button
  onClick={startListening}
  disabled={isListening}
  style={{
    background: isListening ? "rgba(220,53,69,0.2)" : "rgba(127,119,221,0.1)",
    border: `1px solid ${isListening ? "rgba(220,53,69,0.4)" : "rgba(127,119,221,0.2)"}`,
    borderRadius: 12,
    padding: "10px 16px",
    color: isListening ? "#ff6b6b" : "rgba(175,169,236,0.8)",
    fontSize: 13,
    cursor: isListening ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
  }}
>
  {isListening ? "🎙️ Listening..." : "🎤 Speak your answer"}
</button>
        <button
          onClick={sendAnswer}
          disabled={!answer.trim() || isLoading}
          style={{
            background: answer.trim() && !isLoading ? "#7F77DD" : "rgba(127,119,221,0.3)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "14px",
            fontSize: 15,
            fontWeight: 500,
            cursor: answer.trim() && !isLoading ? "pointer" : "not-allowed",
          }}
        >
          {isLoading ? "Waiting for response..." : "Submit Answer →"}
        </button>
      </div>
    </div>
  )
}

const DoneStage = ({ messages }) => {
  const aiMessages = messages.filter(m => m.role === "assistant")
  const lastMessage = (aiMessages[aiMessages.length - 1]?.content || "")
  .replace("INTERVIEW_COMPLETE", "")
  .trim()

  return (
    <div style={{ maxWidth: 580, margin: "0 auto", paddingTop: 32 }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 500, margin: 0 }}>
          Interview Complete!
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginTop: 6 }}>
          Here's your performance summary
        </p>
      </div>

      <div style={{ background: "rgba(127,119,221,0.15)", border: "1px solid rgba(127,119,221,0.3)", borderRadius: 14, padding: 20, marginBottom: 16 }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Final Feedback
        </p>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
          {lastMessage}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={() => window.location.href = "/dashboard"}
          style={{ background: "#7F77DD", color: "#fff", border: "none", borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 500, cursor: "pointer" }}
        >
          Back to Dashboard
        </button>
        <button
          onClick={() => window.location.reload()}
          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 14, fontSize: 15, cursor: "pointer" }}
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

const Interview = () => {
  const [stage, setStage] = useState("setup")
  const [role, setRole] = useState(null)
  const [messages, setMessages] = useState([])
  const [currentReply, setCurrentReply] = useState("")
  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  if (stage === "setup") return <SetupStage role={role} setRole={setRole} setStage={setStage} />
  if (stage === "interview") return <InterviewStage messages={messages} setMessages={setMessages} currentReply={currentReply} setCurrentReply={setCurrentReply} answer={answer} setAnswer={setAnswer} isLoading={isLoading} setIsLoading={setIsLoading} role={role} setStage={setStage} isComplete={isComplete} setIsComplete={setIsComplete} />
  if (stage === "done") return <DoneStage messages={messages} />
}

export default Interview