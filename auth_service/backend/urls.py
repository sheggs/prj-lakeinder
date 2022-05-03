"""backend URL Configuration
These are URL categories

admin/ -> Django amdin routes
auth/* to Lakeinder auth routes located in ./users/auth/urls.py

Add more as you wish :)

"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('users.auth.urls')),
    path('profile/', include('users.profile.urls')),
    path('statics/', include('static.urls'))
]