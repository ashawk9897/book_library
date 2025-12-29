import { useEffect, useState } from "react";
import { getBooks } from "../api/library.api";

export default function BookDropdown({ onSelect }) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const res = await getBooks();
    setBooks(res.data);
  };

  const filtered = books.filter((b) =>
    `${b.title} ${b.author} ${b.id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const selectBook = (book) => {
    onSelect(book);
    setSearch(`${book.title} (${book.author})`);
    setShow(false);
  };

  return (
    <div style={{ position: "relative", width: "300px" }}>
      <input
       className="input"
        placeholder="Search book..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShow(true);
        }}
        onFocus={() => setShow(true)}
      />

      {show && (
        <ul
          style={{
            position: "absolute",
            background: "#fff",
            border: "1px solid #ccc",
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 10,
            padding: 0,
            margin: 0,
            listStyle: "none",
          }}
        >
          {filtered.map((book) => (
            <li
              key={book.id}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onClick={() => selectBook(book)}
            >
              <b>{book.title}</b>
              <br />
              <small>{book.author} — ISBN {book.id}</small>
            </li>
          ))}

          {filtered.length === 0 && (
            <li style={{ padding: "8px" }}>No books found</li>
          )}
        </ul>
      )}
    </div>
  );
}
