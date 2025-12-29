import { useState } from "react";
import Tabs from "./components/Tabs";
import BooksPage from "./pages/BooksPage";
import MembersPage from "./pages/MembersPage";
import BorrowReturnPage from "./pages/BorrowReturnPage";
import 'bulma/css/bulma.min.css';


export default function App() {
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div>
      <h1>Library Management</h1>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "books" && <BooksPage />}
      {activeTab === "members" && <MembersPage />}
      {activeTab === "borrow" && <BorrowReturnPage />}
    </div>
  );
}
