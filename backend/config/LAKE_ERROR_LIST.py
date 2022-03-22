HTTP_CODES = {
    "OK": {"status":200, "string":"SUCCESS"},
    "INCORRECT_PASSWORD": {"status": 400, "string": "Incorrect password"},
    "USER_UNDEFINED": {"status": 400, "string": "User does not exist"},
}


class LAKE_ERROR():
    def __init__(self, http_code):
        try:
            
            self.status = HTTP_CODES[http_code]["status"]
            self.string = HTTP_CODES[http_code]["string"]
        except:
            self.status = 400
            self.string = "Unkown Error"

    def getStatus(self):
        return self.status
    def getMessage(self):
        return self.string


