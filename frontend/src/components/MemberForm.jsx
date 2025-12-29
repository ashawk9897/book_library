import { useState } from "react";
import { createMember } from "../api/library.api";

export default function MemberForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = async () => {
    await createMember({ name, email });
    setName("");
    setEmail("");
    onSuccess();
  };

  return (
    <div>
      <h3>Create Member</h3>

      <input
      className="input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="button is-success" onClick={submit}>Save</button>
    </div>
  );
}
