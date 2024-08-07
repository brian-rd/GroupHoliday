from app.database import db

class Group(db.Model):
    __tablename__ = 'groups'
    id = db.Column(db.Integer, primary_key=True, index=True)
    name = db.Column(db.String, nullable=False)
    holidays = db.relationship('Holiday', back_populates='group')
    members = db.relationship('User', secondary='group_members', back_populates='groups')

# Association table for many-to-many between groups and users
group_members = db.Table('group_members',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('group_id', db.Integer, db.ForeignKey('groups.id'), primary_key=True)
)