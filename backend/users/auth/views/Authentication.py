from rest_framework.views import APIView
from users.serializer import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from users.models import User
from config.config import REFRESH_SECRET, SECRET
import jwt
import datetime
import logging
from config.LAKE_ERROR_LIST import LAKE_ERROR
from users.auth.helper_functions import generateAuthToken, generateRefreshToken, decodeRefreshToken, decodeAuthToken

# For Debugging
# Print does not work in django use https://www.delftstack.com/howto/django/django-print-to-console/
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
        serializer = UserSerializer(data=request.data)
        # Check if the fields are all valid
        serializer.is_valid(raise_exception=True)
        # Save the object into the db.
        serializer.save()
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
        # Store refresh token inside cookies. This is used in the RefreshToken view
        response.set_cookie(key='jwt', value=refresh_token, httponly=True)
        # Set reponse data that contains the accessToken
        header = request.META['HTTP_AUTHORIZATION']
        response.data = {
            "message": LAKE_ERROR("OK").getMessage(), 
            'accessToken': token,
            "header": header}
        # Set up response status code to 200 OK.
        response.status_code = LAKE_ERROR("OK").getStatus()
        # Passed all checks
        return response


class RefreshToken(APIView):
    # Retrieve the access token for front end
    def post(self, request):
        # Retrieve the refresh toke from the cookies
        token = request.COOKIES.get('jwt')
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
        # Return the access token for front end.
        return Response({"message": LAKE_ERROR("OK").getMessage(), "accessToken": auth_token})