from django.urls import path, include

from static.views import WorldCitiesJSON, HealthPageView

urlpatterns = [
    path('world_cities', WorldCitiesJSON.as_view(), name="world_cities"),
    path('', HealthPageView.as_view(), name="health_check")
    # path('login', Login.as_view(), name="user_login"),
    # path('refresh_token', RefreshToken.as_view(), name="user_refresh_token"),
]