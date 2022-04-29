from django.test import SimpleTestCase
from django.urls import reverse, resolve
from users.auth.views.Authentication import Register, Login, RefreshToken
# This test ensures the view and routes match
class TestUrlVIewMapping(SimpleTestCase):
    '''
        @brief This is a test that validates mapping between the user register route and view 
    '''        
    def test_user_register(self):
        url = reverse('user_register')
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, Register)
    '''
        @brief This is a test that validates the user login route and view
    '''        
    def test_user_login(self):
        url = reverse('user_login')
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, Login)
    '''
        @brief This is a test that validates the refresh token route and view.
    '''               
    def test_user_refresh_token(self):
        url = reverse('user_refresh_token')
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, RefreshToken)