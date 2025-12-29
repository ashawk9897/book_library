import { useEffect, useState } from "react";
import { getMembers } from "../api/library.api";
import MemberForm from "../components/MemberForm";

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    const res = await getMembers();
    setMembers(res.data);
  };

  const filteredMembers = members.filter((m) =>
    `${m.name} ${m.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="section">
      <div className="container">

        <h2 className="title is-4">Members</h2>

        {/* Search & Action */}
        <div className="box">
          <div className="field is-grouped is-justify-content-space-between">

            <div className="control is-expanded">
              <input
                className="input"
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="control">
              <button
                className="button is-primary"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "Close" : "Add New Member"}
              </button>
            </div>

          </div>
        </div>

        {/* Member Form */}
        {showForm && (
          <div className="box">
            <MemberForm onSuccess={loadMembers} />
          </div>
        )}

        

      </div>
    </section>
  );
}
