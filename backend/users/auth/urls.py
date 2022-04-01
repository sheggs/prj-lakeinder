from django.urls import path, include
from users.auth.views.Authentication import Register, Login, RefreshToken, LogoutView

urlpatterns = [
    path('register', Register.as_view(), name="user_register"),
    path('login', Login.as_view(), name="user_login"),
    path('logout', LogoutView.as_view(),name="logout"),
    path('refresh_token', RefreshToken.as_view(), name="user_refresh_token"),
]