from rest_framework.views import APIView
from users.serializer import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from users.models import User
import jwt
import datetime
from config.LAKE_ERROR_LIST import LAKE_ERROR
# Create your views here.


# Register View

class Register(APIView):
    # Post Register Request
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        # Check if the fields are all valid
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

# Login View
class Login(APIView):
    # Post Login Request
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        # Filter to the first user found
        user = User.objects.filter(email=email).first()
        if (user is None):
            error = LAKE_ERROR("USER_UNDEFINED")
            return Response({"message": error.getMessage()}, status=error.getStatus())
        # Validate Password
        if not user.check_password(password):
            error = LAKE_ERROR("INCORRECT_PASSWORD")
            return Response({"message": error.getMessage()}, status=error.getStatus())
        
        response = Response()

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=300),
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            "message": LAKE_ERROR("OK").getMessage(), 
            "token": token}
        response.status_code = LAKE_ERROR("OK").getStatus()
        # Passed all checks
        return response

