import React from "react";

function polarToCartesian(cx, cy, r, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");

  return d;
}

export default function ProgressChart({ students = [] }) {
  // buckets 0-25,26-50,51-75,76-100
  const buckets = [0, 0, 0, 0];
  let sum = 0;
  students.forEach((s) => {
    const p = Number(s.progress) || 0;
    sum += p;
    if (p <= 25) buckets[0]++;
    else if (p <= 50) buckets[1]++;
    else if (p <= 75) buckets[2]++;
    else buckets[3]++;
  });

  const total = students.length || 1;
  const avg = Math.round(sum / total);

  const colors = ["#ef4444", "#f97316", "#f59e0b", "#10b981"];
  const bucketLabels = ["0-25", "26-50", "51-75", "76-100"];

  // compute pie slices angles
  const counts = buckets;
  const countSum = counts.reduce((a, b) => a + b, 0) || 1;
  let angleStart = 0;
  const slices = counts.map((c, i) => {
    const angle = (c / countSum) * 360;
    const slice = { start: angleStart, end: angleStart + angle, color: colors[i], count: c };
    angleStart += angle;
    return slice;
  });

  return (
    <div className="card chart-card">
      <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
        <div style={{ width: 160, height: 160, position: "relative" }}>
          <svg viewBox="0 0 160 160" width="160" height="160">
            <defs>
              <linearGradient id="avgGrad" x1="0%" x2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* background circle */}
            <circle cx="80" cy="80" r="60" fill="#f1f5f9" />

            {/* donut: show average progress as arc */}
            <path
              d={describeArc(80, 80, 60, 0, (avg / 100) * 360)}
              fill="url(#avgGrad)"
              opacity="0.95"
            />

            {/* inner cutout */}
            <circle cx="80" cy="80" r="40" fill="white" />
            <text x="80" y="78" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0b1220">
              {avg}%
            </text>
            <text x="80" y="98" textAnchor="middle" fontSize="11" fill="#6b7280">
              Avg Progress
            </text>
          </svg>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Progress Distribution</div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {/* pie small */}
            <svg viewBox="0 0 120 120" width="120" height="120">
              <circle cx="60" cy="60" r="50" fill="#f8fafc" />
              {slices.map((s, i) => {
                if (s.count === 0) return null;
                return <path key={i} d={describeArc(60, 60, 50, s.start, s.end)} fill={s.color} />;
              })}
              <circle cx="60" cy="60" r="28" fill="white" />
            </svg>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {slices.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 12, height: 12, background: s.color, borderRadius: 3, display: "inline-block" }} />
                  <div style={{ fontSize: 13 }}>
                    <strong style={{ marginRight: 6 }}>{bucketLabels[i]}</strong>
                    <span style={{ color: "#6b7280" }}>{s.count} students</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
