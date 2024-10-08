from pydantic import BaseModel, EmailStr, StringConstraints, ConfigDict
from typing_extensions import Annotated

class UserCreateSchema(BaseModel):
    uid: str
    name: Annotated[str, StringConstraints(strip_whitespace=True, max_length=20, pattern=r'^\S+$')]
    email: EmailStr

class UserResponseSchema(BaseModel):
    uid: str
    name: str
    email: EmailStr

    model_config = ConfigDict(
        from_attributes = True
    )