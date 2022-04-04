from django.urls import path, include
from users.profile.views.Profile import SelfUserProfile, UserProfile

urlpatterns = [
    path('', UserProfile.as_view(), name="user_profile"),
    path('me', SelfUserProfile.as_view(), name="self_profile"),
    # path('login', Login.as_view(), name="user_login"),
    # path('refresh_token', RefreshToken.as_view(), name="user_refresh_token"),
]