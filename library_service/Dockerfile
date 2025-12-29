From python:3.11-slim

WORKDIR /
COPY library_service/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY library_service/ .
COPY proto ./proto

# RUN mkdir -p app/grpc_gen && \
#     python -m grpc_tools.protoc \
#       -I proto \
#       --python_out=app/grpc_gen \
#       --grpc_python_out=app/grpc_gen \
#       proto/library.proto

CMD ["python", "-m", "app.main"]
