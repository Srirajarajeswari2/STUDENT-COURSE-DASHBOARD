import { useState } from "react";
import students from "./data/students.json";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import SortMenu from "./components/SortMenu";
import StudentCard from "./components/StudentCard";
import DarkModeToggle from "./components/DarkModeToggle";
import ProgressChart from "./components/ProgressChart";
import Login from "./components/Login";
import { useAuth } from "./auth/AuthProvider";

export default function App() {
  const auth = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("name");
  const [darkMode, setDarkMode] = useState(false);

  let filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filter !== "All") {
    filtered = filtered.filter((s) => s.status === filter);
  }

  if (sort === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "progress") {
    filtered.sort((a, b) => b.progress - a.progress);
  }

  if (!auth.user) return <Login />;

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div className="muted">Signed in as {auth.user?.name}</div>
          <button onClick={() => auth.signout()}>Sign out</button>
        </div>
      </div>

      <h1>Student Dashboard</h1>

      <ProgressChart students={filtered} />

      <div className="search-filter-row">
        <SearchBar search={search} setSearch={setSearch} />
        <Filter filter={filter} setFilter={setFilter} />
        <SortMenu sort={sort} setSort={setSort} />
      </div>

      <div className="cards-grid">
        {filtered.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}
