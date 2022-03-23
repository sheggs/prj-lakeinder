from django.test import TestCase
from django.urls import reverse, resolve
from users.models import User
from users.serializer import UserSerializer
from users.auth.helper_functions import generateAuthToken, generateRefreshToken, decodeAuthToken, decodeRefreshToken
class TestUserModel(TestCase):
    '''
        @brief This is a test that creates the model and validates the outputs
    '''
    def test_model_create(self):
        register = {
            "first_name": "John",
            "last_name": "Adams",
            "email": "test@test.com",
            "password": "password,"
        }

        serializer = UserSerializer(data=register)
        # Check if the fields are all valid
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Check if the data is in the database
        user = User.objects.filter(id=serializer.data["id"]).first()
        self.assertEquals(user.email, register["email"])
        self.assertEquals(user.first_name, register["first_name"])
        self.assertEquals(user.last_name, register["last_name"])
    '''
        @brief This is a test that validates the auth token generation.
    '''        
    def test_generate_auth_token(self):
        register = {
            "first_name": "John",
            "last_name": "Adams",
            "email": "test@test.com",
            "password": "password,"
        }
        serializer = UserSerializer(data=register)
        # Check if the fields are all valid
        serializer.is_valid(raise_exception=True)
        serializer.save()
        _id = serializer.data["id"]
        token = generateAuthToken(_id)
        __id = decodeAuthToken(token)["id"]
        self.assertEquals(_id, __id)
    '''
        @brief This is a test that validates the refresh token generation.
    '''        
    def test_generate_refresh_token(self):
        register = {
            "first_name": "John",
            "last_name": "Adams",
            "email": "test@test.com",
            "password": "password,"
        }
        serializer = UserSerializer(data=register)
        # Check if the fields are all valid
        serializer.is_valid(raise_exception=True)
        serializer.save()
        _id = serializer.data["id"]
        token = generateRefreshToken(_id)
        __id = decodeRefreshToken(token)["id"]
        self.assertEquals(_id, __id)