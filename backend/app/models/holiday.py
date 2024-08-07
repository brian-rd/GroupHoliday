from app.database import db

class Holiday(db.Model):
    __tablename__ = "holidays"
    
    id = db.Column(db.Integer, primary_key=True, index=True)
    group_id = db.Column(db.Integer, db.ForeignKey("groups.id"), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(120))
    
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    
    preferences = db.relationship("Preference", back_populates="holiday")
    availabilities = db.relationship("Availability", back_populates="holiday")
    creator = db.relationship("User", back_populates="holidays")
    group = db.relationship("Group", back_populates="holidays")