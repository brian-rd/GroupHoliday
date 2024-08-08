from app.database import db
from app.models.user import User
from app.schemas.user_schema import UserCreateSchema, UserResponseSchema

class UserService:
    @staticmethod
    def get_user(user_id: int) -> UserResponseSchema:
        user = User.query.get(user_id)
        if user:
            return UserResponseSchema.model_validate(user)
        return None

    @staticmethod
    def create_user(user_data: UserCreateSchema) -> UserResponseSchema:
        user = User(name=user_data.name, email=user_data.email)
        db.session.add(user)
        db.session.commit()
        return UserResponseSchema.model_validate(user)

    @staticmethod
    def update_user(user_id: int, user_data: UserCreateSchema) -> UserResponseSchema:
        user = User.query.get(user_id)
        if user:
            user.name = user_data.name
            user.email = user_data.email
            db.session.commit()
            return UserResponseSchema.model_validate(user)
        return None

    @staticmethod
    def delete_user(user_id: int) -> bool:
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return True
        return False