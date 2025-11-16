export default function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{ marginBottom: "20px", padding: "8px 12px" }}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
