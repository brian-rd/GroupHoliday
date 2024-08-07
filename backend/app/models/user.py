from app.database import db

class User(db.Model):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    
    holidays = db.relationship("Holiday", back_populates="creator")
    preferences = db.relationship("Preference", back_populates="user")
    availabilities = db.relationship("Availability", back_populates="user")
    groups = db.relationship("Group", secondary="group_members", back_populates="members")