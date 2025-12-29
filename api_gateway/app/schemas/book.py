from pydantic import BaseModel


class CreateBookRequest(BaseModel):
    title: str
    author: str
    copies: int


class BookResponse(BaseModel):
    id: int
    title: str
    author: str
    available_copies: int


class BorrowBookRequest(BaseModel):
    book_id: int
    member_id: int


class BorrowedBook(BaseModel):
    borrowing_id: int
    title: str
    borrow_date: str
    return_date: str | None = None


class ReturnBookRequest(BaseModel):
    borrowing_id: int