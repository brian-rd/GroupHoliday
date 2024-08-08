import pytest
from app.main import create_app
from app.database import db
from app.models.user import User

@pytest.fixture(scope='module')
def flask_app():
    app = create_app()
    with app.app_context():
        yield app

@pytest.fixture(scope='module')
def test_client(flask_app):
    return flask_app.test_client()

@pytest.fixture(scope='function', autouse=True)
def setup_database(flask_app):
    with flask_app.app_context():
        db.create_all()
        yield
        db.session.remove()
        db.drop_all()

# Create a user object that's not in the database so we can use it in tests
@pytest.fixture(scope='function')
def new_user():
    user = User(name="TestUser", email="TestUser@example.com")
    return user

# Create a user in the database
@pytest.fixture(scope='function')
def add_user_to_db(test_client, new_user):
    db.session.add(new_user)
    db.session.commit()
    return new_user
