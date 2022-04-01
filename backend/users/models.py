from django.db import models
from django.contrib.auth.models import AbstractUser
from config.user_tokens import TagsEnum
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
    
    def get_user_tags(self):
        tags = Tags.objects.filter(user=self.id)
        data = []
        for i in tags:
            data.append(i.tag)
        return data
        

class Tags(models.Model):
    tag = models.CharField(max_length=255, choices=TagsEnum.choices)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    REQUIRED_FIELDS = []


    @property
    def get_tag(self):
        return self.tag
             