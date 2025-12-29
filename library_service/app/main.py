import grpc
from concurrent import futures
from app.grpc_gen import library_pb2_grpc
from app.service import LibraryService
from app.db.base import Base
from app.db.session import engine   


server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
library_pb2_grpc.add_LibraryServiceServicer_to_server(
    LibraryService(), server
)

Base.metadata.create_all(engine)

server.add_insecure_port("[::]:50051")
server.start()
server.wait_for_termination()