export default function SortMenu({ sort, setSort }) {
  return (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      style={{ padding: "10px" }}
    >
      <option value="name">Name (A-Z)</option>
      <option value="progress">Progress (High-Low)</option>
    </select>
  );
}
