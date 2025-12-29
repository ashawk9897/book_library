import { useState } from "react";
import { createBook } from "../api/library.api";

export default function BookForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [copies, setCopies] = useState("");

  const submit = async () => {
    await createBook({ title, author, copies });
    setTitle("");
    setAuthor("");
    setCopies("");
    onSuccess();
  };

  return (
    <div>
      <h3>Create Book</h3>

      <input
        className="input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="input"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
       className="input"
        placeholder="Copies"
        value={copies}
        onChange={(e) => setCopies(e.target.value)}
      />

      <button className="button is-primary" onClick={submit}>Save</button>
    </div>
  );
}
