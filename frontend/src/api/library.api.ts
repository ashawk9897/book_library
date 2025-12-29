
import api from "./axios";

export const createBook = (book) => {
  return api.post("/books", book);
};

export const getBooks = () => {
  return api.get("/books");
};



export const createMember = (member) => {
  return api.post("/members", member);
};

export const getMembers = () => {
  return api.get("/members");
};

export const listBorrowedBooks = (memberId) => {
  return api.get("/borrowed", {
    params: { member_id: memberId },
  });
};

export const createBorrowedBook = ({ book_id, member_id }) => {
  return api.post("/borrowed", {
    book_id,
    member_id,
  });
};

export const returnBorrowedBook = (borrowingId) => {
  return api.put("/borrowed", {
    borrowing_id: borrowingId,
  });
};