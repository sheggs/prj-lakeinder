import jwt
from users.models import User
from config.config import REFRESH_SECRET, SECRET
import datetime

def generateRefreshToken(id):

    # Check if user is still valid
    if (User.objects.filter(id=id).first() is None):
        return None
    payload = {
        'id': id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=10080),
        'iat': datetime.datetime.utcnow()
    }
    return jwt.encode(payload, REFRESH_SECRET, algorithm='HS256')

def generateAuthToken(id):
    # Check if user is still valid
    if (User.objects.filter(id=id).first() is None):
        return None
    payload = {
        'id': id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=300),
        'iat': datetime.datetime.utcnow()
    }
    return jwt.encode(payload, SECRET, algorithm='HS256')

def decodeAuthToken(token):
    payload = None
    try:
        payload = jwt.decode(token, SECRET, algorithms=['HS256'])
    except Exception:
        pass
    return payload

def decodeRefreshToken(token):
    payload = None
    try:
        payload = jwt.decode(token, REFRESH_SECRET, algorithms=['HS256'])
    except Exception:
        pass
    return payload