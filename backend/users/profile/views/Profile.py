from rest_framework.views import APIView
from users.serializer import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from users.models import User
import jwt
import datetime
from config.LAKE_ERROR_LIST import LAKE_ERROR
# View to get your own profile
class SelfUserProfile(APIView):
    '''
        def get(self,response):
            now u can get the jwt token by doing
            token = request.COOKIES.get('jwt')
            but we will be taking the token from the api request. look at request.headers.get('Authorization') :)

            check validity by doing 
            try:
                payload = jwt.token(token, 'secret', algorith=['HS256'])
            except jwt.ExpiredSignatureError:
                raise an exception of your liking
                all exceptions are inside the config/LAKE_ERROR_LIST
            This payload contains the following data

            {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=300),
            'iat': datetime.datetime.utcnow()
             }

    '''
    pass
class UserProfile(APIView):
    pass

