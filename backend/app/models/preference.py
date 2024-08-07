from app.database import db

class Preference(db.Model):
    __tablename__ = "preferences"
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    holiday_id = db.Column(db.Integer, db.ForeignKey("holidays.id"), nullable=False)
    
    tags = db.Column(db.String)
    max_budget = db.Column(db.Float)
    
    user = db.relationship("User", back_populates="preferences")
    holiday = db.relationship("Holiday", back_populates="preferences")