from django.urls import path, include

from static.views import WorldCitiesJSON

urlpatterns = [
    path('world_cities', WorldCitiesJSON.as_view(), name="world_cities"),
    # path('login', Login.as_view(), name="user_login"),
    # path('refresh_token', RefreshToken.as_view(), name="user_refresh_token"),
]