
def test_create_user(test_client):
    response = test_client.post('/users', json={
        'name': 'TestUser',
        'email': 'TestUser@example.com'
    })
    
    assert response.status_code == 201
    assert response.json['name'] == 'TestUser'
    assert response.json['email'] == 'TestUser@example.com'
    
    

def test_get_user(test_client, add_user_to_db):
    response = test_client.get(f'/users/{add_user_to_db.id}')
    
    assert response.status_code == 200
    assert response.json['name'] == 'TestUser'
    assert response.json['email'] == 'TestUser@example.com'
    


def test_update_user(test_client, add_user_to_db):
    response = test_client.put(f'/users/{add_user_to_db.id}', json={
        'name': 'UpdatedUser',
        'email': 'UpdatedUser@example.com'
    })
    
    assert response.status_code == 200
    assert response.json['name'] == 'UpdatedUser'
    assert response.json['email'] == 'UpdatedUser@example.com'
    
    

def test_delete_user(test_client, add_user_to_db):
    response = test_client.delete(f'/users/{add_user_to_db.id}')
    assert response.status_code == 200
    assert response.json['message'] == 'User deleted'

    response = test_client.get(f'/users/{add_user_to_db.id}')
    
    assert response.status_code == 404
    assert response.json['error'] == 'User not found'
    
    

def test_get_nonexistent_user(test_client):
    response = test_client.get('/users/9999')
    
    assert response.status_code == 404
    assert response.json['error'] == 'User not found'
    
    
def test_create_user_with_duplicate_username(test_client, add_user_to_db):
    add_user_to_db(name="TestUser", email="test1@example.com")
    
    response = test_client.post('/users', json={
        'uid': 'unique-id',
        'name': 'TestUser',
        'email': 'test2@example.com'
    })
    
    assert response.status_code == 400
    assert response.json['error'] == 'Username already exists'