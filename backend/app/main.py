from flask import Flask
from flask_cors import CORS
from app.controllers import user_controller
#, holiday_controller, preference_controller
from app.database import init_db
from app.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    
    init_db(app)

    app.register_blueprint(user_controller.user_bp)
    # app.register_blueprint(holiday_controller.bp)
    # app.register_blueprint(preference_controller.bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=8000)