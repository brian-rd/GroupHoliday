from app.database import db

class Availability(db.Model):
    __tablename__ = "availabilities"
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    holiday_id = db.Column(db.Integer, db.ForeignKey("holidays.id"), nullable=False)
    
    available_dates = db.Column(db.ARRAY(db.Date), nullable=False)
    
    user = db.relationship("User", back_populates="availabilities")
    holiday = db.relationship("Holiday", back_populates="availabilities")