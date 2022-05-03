import requests
import config.config as Config
# For Debugging
# Print does not work in django use https://www.delftstack.com/howto/django/django-print-to-console/

def fileUpload(name, file):
    response = requests.post(Config.FILE_SERVER, files = {"image": file})
    if(response.ok):
        return f'{response.text}'

    else:
        raise Exception("File server cannot be reached")