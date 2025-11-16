import ProgressBar from "./ProgressBar";

export default function StudentCard({ student }) {
  const initials = (student.name || "")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const statusClass = `badge ${student.status || "Inactive"}`;

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div className="avatar">{initials}</div>
          <div>
            <div className="student-name">{student.name}</div>
            <div className="student-course">{student.course}</div>
          </div>
        </div>

        <div className="meta-right">
          <div className={statusClass}>{student.status}</div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <ProgressBar progress={student.progress} />
        <div className="meta-row" style={{ marginTop: 8 }}>
          <div className="muted">Progress: {student.progress}%</div>
          <div className="muted">Enrolled: {student.enrollmentDate}</div>
        </div>
      </div>
    </div>
  );
}
