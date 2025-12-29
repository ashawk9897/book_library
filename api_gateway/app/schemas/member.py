from pydantic import BaseModel


class CreateMemberRequest(BaseModel):
    name: str
    email: str


class MemberResponse(BaseModel):
    id: int
    name: str
    email: str
