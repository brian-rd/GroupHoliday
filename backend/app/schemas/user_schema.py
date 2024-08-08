from pydantic import BaseModel, EmailStr

class UserCreateSchema(BaseModel):
    name: str
    email: EmailStr

class UserResponseSchema(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        orm_mode = True