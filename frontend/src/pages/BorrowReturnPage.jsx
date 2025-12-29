import { useState } from "react";
import {
  listBorrowedBooks,
  createBorrowedBook,
  returnBorrowedBook,
} from "../api/library.api";
import BookDropdown from "../components/BookDropdown";
import Notification from "../components/Notification";

export default function BorrowReturnPage() {
  const [memberId, setMemberId] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const loadBorrowedBooks = async () => {
    if (!memberId) return;

    setLoading(true);
    setError("");

    try {
      const res = await listBorrowedBooks(memberId);
      setBorrowedBooks(res.data);
    } catch {
      setError("Failed to fetch borrowed books");
      setBorrowedBooks([]);
    } finally {
      setLoading(false);

    }
  };

  const borrowBook = async () => {
    if (!memberId || !selectedBook) return;

    try {
      await createBorrowedBook({
        member_id: Number(memberId),
        book_id: selectedBook.id,
      });
      setSelectedBook(null);
      setSuccess("Book borrowed successfully");
      loadBorrowedBooks();
    } catch {
      alert("Failed to borrow book");
      setError("Failed to borrow book");
    }
  };

  const returnBook = async (borrowingId) => {
    try {
      await returnBorrowedBook(borrowingId);
      loadBorrowedBooks();
    } catch {
      alert("Failed to return book");
    }
  };

  const borrowedActive = borrowedBooks.filter(
    (b) => b.return_date === null
  );

  const borrowedReturned = borrowedBooks.filter(
    (b) => b.return_date !== null
  );

  return (
    <section className="section">
      <div className="container">

        <h2 className="title is-4">Borrow / Return Books</h2>

        {/* Member Selection */}
        <div className="box">
          <div className="field is-grouped">
            <div className="control">
              <input
                className="input"
                type="number"
                placeholder="Member ID"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              />
            </div>
            <div className="control">
              <button
                className="button is-link"
                onClick={loadBorrowedBooks}
              >
                Load Borrowed Books
              </button>
            </div>
          </div>
        </div>

        {/* Borrow New Book */}
        {memberId && (
          <div className="box">
            <h3 className="title is-5">Borrow New Book</h3>

            <div className="field">
              <BookDropdown onSelect={setSelectedBook} />
            </div>

            <button
              className="button is-primary"
              disabled={!selectedBook}
              onClick={borrowBook}
            >
              Borrow
            </button>
          </div>
        )}

        {/* Status */}
        {loading && (
          <p className="has-text-info">Loading...</p>
        )}
        {error && (
          <p className="has-text-danger">{error}</p>
        )}

        {/* Active Borrowed Books */}
        {borrowedActive.length > 0 && (
          <div className="box">
            <h3 className="title is-5">📚 Borrowed Books</h3>

            {borrowedActive.map((b) => (
              <div
                key={b.borrowing_id}
                className="media"
              >
                <div className="media-content">
                  <p>
                    <strong>{b.title}</strong>
                    <br />
                    Borrowed At:{" "}
                    {new Date(b.borrow_date).toLocaleString()}
                  </p>
                </div>

                <div className="media-right">
                  <button
                    className="button is-warning"
                    onClick={() =>
                      returnBook(b.borrowing_id)
                    }
                  >
                    Return
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Returned Books */}
        {borrowedReturned.length > 0 && (
          <div className="box">
            <h3 className="title is-5 has-text-success">
              ✅ Returned Books
            </h3>

            {borrowedReturned.map((b) => (
              <p key={b.borrowing_id}>
                <strong>{b.title}</strong>
                <br />
                Borrowed At:{" "}
                {new Date(b.borrow_date).toLocaleString()}
                <br />
                Returned At:{" "}
                {new Date(b.return_date).toLocaleString()}
              </p>
            ))}
          </div>
        )}

        {borrowedActive.length === 0 &&
          borrowedBooks.length > 0 && (
            <p>No active borrowings.</p>
          )}

      </div>
    </section>
  );
}
