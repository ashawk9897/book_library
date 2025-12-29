from fastapi import APIRouter
from app.grpc.client import grpc_client
from app.grpc_gen.library_pb2 import (
    CreateBookRequest as CreateBookRequestPB,
    Empty as empty,
    BorrowBookRequest as BorrowBookRequestPB,
    MemberId,
    ReturnBookRequest as ReturnBookRequestPB,
)
from app.schemas.book import (
    CreateBookRequest,
    BookResponse,
    BorrowBookRequest,
    BorrowedBook,
    ReturnBookRequest,
)

router = APIRouter()

@router.post("/books", response_model=BookResponse)
def create_book(req: CreateBookRequest):
    proto_resp = grpc_client.CreateBook(
        CreateBookRequestPB(
            title=req.title,
            author=req.author,
            copies=req.copies
        )
    )

    return BookResponse(
        id=proto_resp.id,
        title=proto_resp.title,
        author=proto_resp.author,
        available_copies=proto_resp.available_copies
    )

@router.get("/books", response_model=list[BookResponse])
def list_books():
    proto_resp = grpc_client.ListBooks(empty())

    return [
        BookResponse(
            id=book.id,
            title=book.title,
            author=book.author,
            available_copies=book.available_copies
        ) for book in proto_resp.books
    ]

@router.post("/borrowed")
def create_borrowed_book(req: BorrowBookRequest):
    grpc_client.BorrowBook(
                            BorrowBookRequestPB(book_id=req.book_id,
                                                member_id=req.member_id)
                        )

    return {"message": "Book borrowed successfully"}

@router.put("/borrowed")
def return_book(req: ReturnBookRequest):
    grpc_client.ReturnBook(ReturnBookRequestPB(borrowing_id=req.borrowing_id))

    return {"message": "Book borrowed successfully"}

@router.get("/borrowed", response_model=list[BorrowedBook])
def list_borrowed_books(member_id: int):
    proto_resp = grpc_client.ListBorrowBookByMember(MemberId(member_id=member_id))

    return [
        BorrowedBook(
            borrowing_id=borrowed.borrowing_id,
            borrow_date=borrowed.borrow_date,
            title=borrowed.title,
            return_date=borrowed.return_date if borrowed.return_date else None
        ) for borrowed in proto_resp.items
    ]
