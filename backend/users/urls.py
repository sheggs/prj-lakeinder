from django.urls import path, include
from .views.Authentication import Register, Login

urlpatterns = [
    path('register', Register.as_view()),
    path('login', Login.as_view())
]