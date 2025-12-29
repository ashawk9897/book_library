from app.grpc_gen import library_pb2_grpc, library_pb2
from app.db.session import SessionLocal
from app.db.model import Book, Member, Borrowing
import grpc
import datetime
import logging
from datetime import datetime

logging.basicConfig(level=logging.INFO)


class LibraryService(library_pb2_grpc.LibraryServiceServicer):

    def CreateBook(self, request, context):
        logging.error(f"Received CreateBook request: {request}")
        db = SessionLocal()
        book = Book(
            title=request.title,
            author=request.author,
            available_copies=request.copies
        )
        db.add(book)
        db.commit()
        db.refresh(book)
        return library_pb2.Book(id=book.id, title=book.title, author=book.author, available_copies=book.available_copies) 

    def ListBooks(self, request, context):
        db = SessionLocal()
        books = db.query(Book).all()
        book_list = library_pb2.BookList()
        for book in books:
            book_list.books.add(id=book.id, title=book.title, author=book.author, available_copies=book.available_copies)
        return book_list

    def CreateMember(self, request, context):
        db = SessionLocal()
        member = Member(name=request.name, email=request.email)
        db.add(member)
        db.commit()
        db.refresh(member)
        return library_pb2.Member(id=member.id, name=member.name, email=member.email)

    def BorrowBook(self, request, context):
        db = SessionLocal()
        member = db.query(Member).filter(Member.id == request.member_id).first()
        if not member:
            context.abort(grpc.StatusCode.NOT_FOUND,"Member not found")

        book_update = db.query(Book).filter(Book.id == request.book_id, 
                                     Book.available_copies > 0).update({
                                            Book.available_copies: Book.available_copies - 1},
                                            synchronize_session=False
                                         )
        if book_update == 0:
            context.abort(grpc.StatusCode.NOT_FOUND,"Book not available")

        borrowing = Borrowing(member_id=member.id, book_id=request.book_id)
        db.add(borrowing)
        try:
            db.commit()
            db.refresh(borrowing)
        except Exception:
            db.rollback()
            context.abort(grpc.StatusCode.INTERNAL, "Could not borrow book")
        return library_pb2.BorrowResponse(message="Book borrowed successfully")

    def ListBorrowBookByMember(self, request, context):
        db = SessionLocal()
        borrowings = db.query(Borrowing).filter(Borrowing.member_id == request.member_id).all()
        borrowing_list = library_pb2.BorrowedBookList()
        for borrowing in borrowings:
            borrowing_list.items.add(borrowing_id=borrowing.id,
                                    title=borrowing.book.title,
                                    borrow_date=str(borrowing.borrow_date),
                                    return_date=str(borrowing.return_date) if borrowing.return_date else "")
        return borrowing_list

    def ReturnBook(self, request, context):
        db = SessionLocal()
        borrowing = db.query(Borrowing).filter(Borrowing.id == request.borrowing_id,
                                              Borrowing.return_date == None).first()
        if not borrowing:
            context.abort(grpc.StatusCode.NOT_FOUND, "Borrowing record not found or already returned")

        borrowing.return_date = datetime.utcnow()
        db.query(Book).filter(Book.id == borrowing.book_id).update({
            Book.available_copies: Book.available_copies + 1
        }, synchronize_session=False)

        try:
            db.commit()
            db.refresh(borrowing)
        except Exception:
            db.rollback()
            context.abort(grpc.StatusCode.INTERNAL, "Could not return book")

        return library_pb2.ReturnResponse(message="Book returned successfully.")