from django.urls import path
from .views import signup, profile, dashboard, EmailTokenObtainPairView, login

urlpatterns = [
    path("signup/", signup, name="signup"),
    path("api/accounts/login/", login, name="login"),   # <-- new
    path("profile/", profile, name="profile"),
    path("dashboard/", dashboard, name="dashboard"),
    path("token/", EmailTokenObtainPairView.as_view(), name="token_obtain_pair"),
]
