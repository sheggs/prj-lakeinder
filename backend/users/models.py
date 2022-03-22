from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255) 
    email = models.CharField(max_length=255, unique=True) 
    password =  models.CharField(max_length=255)
    # TODO: ADD URLS FOR ACCOUNTS
    # 3-4 Images Links?

    # Overriding Django default field
    username = None
    # We login with email only.
    USERNAME_FIELD = 'email'
    # Populate with the required fields
    REQUIRED_FIELDS = []