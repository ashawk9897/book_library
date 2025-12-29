From python:3.11-slim

WORKDIR /app

COPY api_gateway/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY api_gateway/ .
COPY proto ./proto

# RUN mkdir -p app/grpc_gen && \
#     touch app/grpc_gen/__init__.py && \
#     python -m grpc_tools.protoc \
#       -I proto \
#       --python_out=app/grpc_gen \
#       --grpc_python_out=app/grpc_gen \
#       proto/library.proto

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
