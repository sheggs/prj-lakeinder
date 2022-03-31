from rest_framework.views import APIView
from users.serializer import UserSerializer, TagsSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from users.models import User, Tags
from users.auth.helper_functions import decodeAuthToken
import jwt
import datetime
import json
from config.LAKE_ERROR_LIST import LAKE_ERROR
# View to get your own profile
# For Debugging
# Print does not work in django use https://www.delftstack.com/howto/django/django-print-to-console/

import logging
logging.basicConfig(level=logging.NOTSET) # Here

class SelfUserProfile(APIView):
    def get(self, request):
        # Authentication
        payload = decodeAuthToken(request.META.get('HTTP_AUTHORIZATION'))
        if payload == None:
            err = LAKE_ERROR("TOKEN_ERROR")
            return Response({"message": err.getMessage()}, status=err.getStatus())
        user_id = payload["id"]
        user = User.objects.filter(id=user_id).first()
        if user == None:
            err = LAKE_ERROR("USER_UNDEFINED")
            return Response({"message": err.getMessage()}, status=err.getStatus())
        _userserializer = UserSerializer(user)
        data = _userserializer.data

        ## Get all the user tags
        data["tags"] =user.get_user_tags()
        
        
        return Response(data)

'''
    @TODO: Complete this, should be the same as profile but accepts a user_id and returns their profile
'''
class UserProfile(APIView):
    def view(self, _type, request):

        search_id = None
        req_bod = None
        if(_type == "GET"):
            search_id = request.GET.get("id", None)
        else:
            body = request.body.decode('utf-8')
            if(type(request.body) == bytes):
                body = json.loads(body)
            search_id = body["id"]
        logging.debug(search_id)

        return Response({"msg":"msg"})
    def get(self, request):
        return self.view("GET", request)
    def post(self, request):
        logging.debug("POST")
        logging.debug(request.body)
        return self.view("POST", request)


