import { useEffect, useState } from "react";
import { getBooks } from "../api/library.api";
import BookForm from "../components/BookForm";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const res = await getBooks();
    setBooks(res.data);
  };

  const filteredBooks = books.filter((b) =>
    `${b.title} ${b.author} ${b.copies}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="section">
      <div className="container">

        <h2 className="title is-4">Books</h2>

        {/* Search & Action */}
        <div className="box">
          <div className="field is-grouped is-justify-content-space-between">

            <div className="control is-expanded">
              <input
                className="input"
                placeholder="Search books..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="control">
              <button
                className="button is-primary"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "Close" : "Add New Book"}
              </button>
            </div>

          </div>
        </div>

        {/* Book Form */}
        {showForm && (
          <div className="box">
            <BookForm onSuccess={loadBooks} />
          </div>
        )}

        {/* Books List */}
        <div className="box">
          <h3 className="title is-5">Book List</h3>

          {filteredBooks.length === 0 && (
            <p>No books found.</p>
          )}

          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="media"
            >
              <div className="media-content">
                <p>
                  <strong>
                    ISBN {book.id} — {book.title}
                  </strong>
                  <br />
                  <span className="has-text-grey">
                    {book.author}
                  </span>
                  <br />
                  <span className="tag is-info">
                    Available Copies: {book.available_copies}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
