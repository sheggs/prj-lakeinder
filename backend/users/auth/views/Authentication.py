from rest_framework.views import APIView
from users.serializer import UserSerializer, TagsSerializer
from users.models import User
from config.utils import requiredFields, remove_duplicates
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

from config.config import REFRESH_SECRET, SECRET
import jwt
import datetime
from config.LAKE_ERROR_LIST import LAKE_ERROR
from users.auth.helper_functions import generateAuthToken, generateRefreshToken, decodeRefreshToken, decodeAuthToken

# DO NOT DELETE
from django.http import HttpResponse
import json
# For Debugging
# Print does not work in django use https://www.delftstack.com/howto/django/django-print-to-console/
import logging
logging.basicConfig(level=logging.NOTSET) # Here


# Create your views here.
'''
    How to validate the user is logged in.
    header = request.META['HTTP_AUTHORIZATION']
    This will give you the jwt token
    Now you can decode this to get the user id
    user_id = decodeRefreshToken(header)["id"]


'''
# Register View
'''
    @brief This view takes in a JSON converts the data into a serial object and saves using the Django model functionality 
'''        
class Register(APIView):
    # Post Register Request
    def post(self, request):
        # Convert the JSON input data into a serial model object

        # pop data...
        # Extra Required Fields. Not including user fields...
        logging.debug(request.data)
        resp, code = requiredFields(["tags"], request.data)


        if(resp):
            return Response(resp, status=code)
        
        
        tags = request.data["tags"]
        tags = remove_duplicates(tags)
        logging.debug(tags)
        del request.data["tags"]

        '''
            @TODO
            request.data
            Remove images from this
            image1, image2, image3, images4
            Then pass these images to fileservices
            then replace the data inside the fields image1 = [URL OF IMAGE SERVICE..]

            EG
            request.data["image1"] = BINARY DATA.. ... ..
            IDSerivce = uploadToFileServices(reqest.data["image1"])
            ^^ Should contain an image id from FileSErvices
            SET request.data["image1"] = IMAGE_ID from file services
        '''
        serializer = UserSerializer(data=request.data)

        # Check if the fields are all valid
        serializer.is_valid(raise_exception=True)
        # Save the object into the db.
        serializer.save()
        logging.debug(serializer)


        user_id = serializer.data["id"]
        logging.debug(user_id)
        logging.debug("asdasd")

        for i in tags:
            data = {
                "user": user_id,
                "tag": i
            }
            logging.debug(data)
            tagSerializer = TagsSerializer(data=data)
            tagSerializer.is_valid(raise_exception=True)
            tagSerializer.save()
        return Response(serializer.data)

# Login View
class Login(APIView):
    # Post Login Request
    def post(self, request):
        # Retrieving data from the JSON request
        email = request.data['email']
        password = request.data['password']
        # Filter to the first user found
        user = User.objects.filter(email=email).first()
        # Validate user existence
        if (user is None):
            error = LAKE_ERROR("USER_UNDEFINED")
            return Response({"message": error.getMessage()}, status=error.getStatus())
        # Validate Password
        if not user.check_password(password):
            error = LAKE_ERROR("INCORRECT_PASSWORD")
            return Response({"message": error.getMessage()}, status=error.getStatus())
        
        response = Response()
        # Generate refresh token
        refresh_token = generateRefreshToken(user.id)
        # Generate Authentication token
        token = generateAuthToken(user.id)
        # Check if the tokens have been generated succesfully
        if(refresh_token is None or token is None):
            error = LAKE_ERROR("USER_UNDEFINED")
            return Response({"message": error.getMessage()}, status=error.getStatus())

        # Set reponse data that contains the accessToken
        data_resp = {
            "message": LAKE_ERROR("OK").getMessage(), 
            'accessToken': token}
        # Store refresh token inside cookies. This is used in the RefreshToken view
        response = HttpResponse(json.dumps(data_resp), content_type="application/json")

        response.set_cookie('jwt', refresh_token)

        # Set up response status code to 200 OK.
        response.status_code = LAKE_ERROR("OK").getStatus()
        # Passed all checks
        return response


class RefreshToken(APIView):
    # Retrieve the access token for front end
    def post(self, request):
        # Retrieve the refresh toke from the cookies
        token = request.COOKIES.get('jwt')
        logging.debug("REFRESH-TOKEN")
        logging.debug(token)

        # Initalise the payload (future use)
        payload = None
        # Is the cookies empty?
        if(token is None):
            error = LAKE_ERROR("TOKEN_ERROR")
            return Response({"message": error.getMessage()}, status=error.getStatus())
        # Attempt to decode the refresh token
        try:
            payload = jwt.decode(token, REFRESH_SECRET, algorithms=['HS256'])
        # If the token is expired, invalid or empty run this exception.
        # Returns an error, more definition of this error can be viewed in the LAKE_ERROR_LIST file in /config/LAKE_ERROR_LIST.py
        except Exception:
            error = LAKE_ERROR("TOKEN_ERROR")
            return Response({"message": error.getMessage()}, status=error.getStatus())

        # Check if user is still valid       
        auth_token = generateAuthToken(payload["id"])
        # Check if the auth_token is empty
        if (auth_token is None):
            error = LAKE_ERROR("USER_UNDEFINED")
            return Response({"message": error.getMessage()}, status=error.getStatus())
        logging.debug("Ending")

        # Return the access token for front end.
        return Response({"message": LAKE_ERROR("OK").getMessage(), "accessToken": auth_token})


class LogoutView(APIView):
    # Retrieve the access token for front end
    def get(self, request):
        # Retrieve the refresh toke from the cookies
        response = HttpResponse()
        response.delete_cookie("jwt")
        return response
        # response = Response({"Cookie Gone": True})
        # expires = datetime.datetime.utcnow() + datetime.timedelta(seconds=1)
        # # response.delete_cookie(key='jwt',  path="/", domain="localhost")

        response.set_cookie(key='jwt', value='', httponly=True, expires=1)
        return response
     