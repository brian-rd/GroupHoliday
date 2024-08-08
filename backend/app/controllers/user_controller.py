from flask import Blueprint, request, jsonify
from flask_pydantic import validate
from app.services.user_service import UserService
from app.schemas.user_schema import UserCreateSchema, UserResponseSchema

user_bp = Blueprint('user', __name__)

@user_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id: int):
    user = UserService.get_user(user_id)
    if user:
        return jsonify(user.dict()), 200
    return jsonify({"error": "User not found"}), 404

@user_bp.route('/users', methods=['POST'])
@validate()
def create_user(body: UserCreateSchema):
    user = UserService.create_user(body)
    return jsonify(user.dict()), 201

@user_bp.route('/users/<int:user_id>', methods=['PUT'])
@validate()
def update_user(user_id: int, body: UserCreateSchema):
    user = UserService.update_user(user_id, body)
    if user:
        return jsonify(user.dict()), 200
    return jsonify({"error": "User not found"}), 404

@user_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id: int):
    success = UserService.delete_user(user_id)
    if success:
        return jsonify({"message": "User deleted"}), 200
    return jsonify({"error": "User not found"}), 404