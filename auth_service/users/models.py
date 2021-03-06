from django.db import models
from django.contrib.auth.models import AbstractUser
from config.user_tokens import TagsEnum
from django.core.exceptions import ValidationError
from datetime import date
import os
import json
# For Debugging
# Print does not work in django use https://www.delftstack.com/howto/django/django-print-to-console/
import logging
logging.basicConfig(level=logging.NOTSET) # Here
module_dir = os.path.dirname(__file__)


# Create your models here.
class User(AbstractUser):
    # don't know if we want these validators here or somewhere else feel free to move/remove
    def validate_sex(sex):
        if (sex != 0) and (sex != 1) and (sex != 2) and (sex != 9):
            raise ValidationError(
                ('%(sex)s is not a valid sex.'),
                params={'sex': sex},
            )
    
    def validate_is_of_age(date_of_birth):
        age = (date.today() - date_of_birth).days / 365
        if age < 18:
            raise ValidationError(
                ('%(date_of_birth)s is too young.'),
                params={'date_of_birth': date_of_birth},
            )
        
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255) 
    email = models.CharField(max_length=255, unique=True) 
    password =  models.CharField(max_length=255)
    # ISO/IEC 5218 says: 0 = not known, 1 = male, 2 = female, 9 = not applicable/other
    sex = models.IntegerField(default = 0, editable =  True, validators = [validate_sex])
    date_of_birth = models.DateField(validators = [validate_is_of_age])
    image1 = models.CharField(max_length=255)
    image2 = models.CharField(max_length=255)
    image3 = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    # TODO: ADD URLS FOR ACCOUNTS
    # 3-4 Images Links?

    # Overriding Django default field
    username = None
    # We login with email only.
    USERNAME_FIELD = 'email'
    # Populate with the required fields
    REQUIRED_FIELDS = []
    
    def get_lon_lat(self):
        f = open(os.path.abspath(os.path.join(module_dir, '..', 'static/data/worldcities.json')))
        j = json.load(f)
        for i in j[self.country]:
            if(i["City"] == self.city):
                return i["Longitude"],i["Latitude"]
        return 0.0,0.0

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
             