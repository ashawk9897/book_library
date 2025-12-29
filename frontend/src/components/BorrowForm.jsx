import { useState } from "react";
import { borrowBook, returnBook } from "../api/library.api";

export default function BorrowForm() {
  const [bookId, setBookId] = useState("");
  const [memberId, setMemberId] = useState("");

  const borrow = async () => {
    try {
      await borrowBook({
        book_id: Number(bookId),
        member_id: Number(memberId),
      });
      alert("Book borrowed");
    } catch (err) {
      alert("Borrow failed");
    }
  };

  const returnBk = async () => {
    try {
      await returnBook({
        book_id: Number(bookId),
        member_id: Number(memberId),
      });
      alert("Book returned");
    } catch (err) {
      alert("Return failed");
    }
  };

  return (
    <div>
      <h2>Borrow / Return</h2>

      <input
        className="input"
        type="number"
        placeholder="Book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      />

      <input
        className="input"
        type="number"
        placeholder="Member ID"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
      />

      <button className="button is-success" onClick={borrow}>Borrow</button>
      <button className="button is-danger" onClick={returnBk}>Return</button>
    </div>
  );
}
