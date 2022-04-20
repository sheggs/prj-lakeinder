from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
import jwt
import datetime
import json
from config.LAKE_ERROR_LIST import LAKE_ERROR
import os

import logging
logging.basicConfig(level=logging.NOTSET)
module_dir = os.path.dirname(__file__)

class WorldCitiesJSON(APIView):
    def get(self, request):
        logging.error("Log message goes here.")
        f = open(os.path.join(module_dir,'data/worldcities.json'))
        j = json.load(f)
        return Response(j)

   
