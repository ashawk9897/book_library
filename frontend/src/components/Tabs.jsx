export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs is-boxed is-medium">
      <ul>
        <li className={activeTab === "books" ? "is-active" : ""}>
          <a onClick={() => setActiveTab("books")}>
            <span>Books</span>
          </a>
        </li>

        <li className={activeTab === "members" ? "is-active" : ""}>
          <a onClick={() => setActiveTab("members")}>
            <span>Members</span>
          </a>
        </li>

        <li className={activeTab === "borrow" ? "is-active" : ""}>
          <a onClick={() => setActiveTab("borrow")}>
            <span>Borrow / Return</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
