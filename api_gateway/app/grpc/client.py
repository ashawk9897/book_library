import grpc
from app.grpc_gen.library_pb2_grpc import LibraryServiceStub

grpc_channel = grpc.insecure_channel("library-service:50051")
grpc_client = LibraryServiceStub(grpc_channel)