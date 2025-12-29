from fastapi import APIRouter
from app.grpc.client import grpc_client
from app.grpc_gen.library_pb2 import CreateMemberRequest as CreateMemberRequestPB
from app.schemas.member import CreateMemberRequest, MemberResponse


router = APIRouter()

@router.post("/members", response_model=MemberResponse)
def create_book(req: CreateMemberRequest):
    proto_resp = grpc_client.CreateMember(
        CreateMemberRequestPB(
            name=req.name,
            email=req.email,
        )
    )

    return MemberResponse(
        id=proto_resp.id,
        name=proto_resp.name,
        email=proto_resp.email
    )
