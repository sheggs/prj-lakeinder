from django.urls import path, include
from users.auth.views.Authentication import Register, Login, RefreshToken

urlpatterns = [
    path('register', Register.as_view(), name="user_register"),
    path('login', Login.as_view(), name="user_login"),
    path('refresh_token', RefreshToken.as_view(), name="user_refresh_token"),
]