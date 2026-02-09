from django.urls import path
from . import api_views

urlpatterns = [
    path("dashboard/", api_views.dashboard, name="dashboard"),
]
