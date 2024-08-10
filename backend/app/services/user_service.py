from app.database import db
from app.models.user import User
from app.schemas.user_schema import UserCreateSchema, UserResponseSchema
from sqlalchemy.exc import IntegrityError

class UserService:
    @staticmethod
    def get_user(user_id: str) -> UserResponseSchema:
        user = db.session.get(User, user_id)
        if user:
            return UserResponseSchema.model_validate(user)
        return None

    @staticmethod
    def create_user(user_data: UserCreateSchema) -> UserResponseSchema:
        existing_user = db.session.query(User).filter_by(name=user_data.name).first()
        if existing_user:
            raise ValueError("Username already exists")

        user = User(uid=user_data.uid, name=user_data.name, email=user_data.email)
        db.session.add(user)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            raise ValueError("Username already exists")
        
        return UserResponseSchema.model_validate(user)

    @staticmethod
    def update_user(user_id: str, user_data: UserCreateSchema) -> UserResponseSchema:
        user = db.session.get(User, user_id)
        if user:
            user.name = user_data.name
            user.email = user_data.email
            db.session.commit()
            return UserResponseSchema.model_validate(user)
        return None

    @staticmethod
    def delete_user(user_id: str) -> bool:
        user = db.session.get(User, user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return True
        return False