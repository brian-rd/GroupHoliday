from pydantic import BaseModel, EmailStr, constr

class UserCreateSchema(BaseModel):
    name: constr(max_length=20) # type: ignore
    email: EmailStr

class UserResponseSchema(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        orm_mode = True