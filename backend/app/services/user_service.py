from app.models import User
from app.database import db

class UserService:
    def create_user(self, user_data):
        # Create a new user instance
        new_user = User(**user_data.dict())
        
        # Add and commit the new user to the database
        db.session.add(new_user)
        db.session.commit()
        
        return new_user

    def get_user_by_id(self, user_id):
        # Fetch a user by ID from the database
        user = User.query.get(user_id)
        return user
