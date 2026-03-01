from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import EmailTokenObtainPairView
from core import api_views as core_api
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),

    # JWT endpoints
    path("api/token/", EmailTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # app routes
    path("api/accounts/", include("accounts.urls")),
    path("api/dashboard/", core_api.dashboard, name="dashboard"),
]

# React fallback (must be last)
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name="index.html")),
]