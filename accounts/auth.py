# Hlech/accounts/auth.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework import exceptions

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Accepts either { "email": "...", "password": "..." } or { "username": "...", "password": "..." }.
    If 'email' is provided, map it to the corresponding username for SimpleJWT.
    """

    def validate(self, attrs):
        # accept email or username in the payload
        email_or_username = attrs.get("email") or attrs.get("username")
        password = attrs.get("password")

        if not email_or_username or not password:
            raise exceptions.AuthenticationFailed("Email/username and password required")

        # If an email was provided, find user by email and set attrs['username']
        if attrs.get("email"):
            try:
                user = User.objects.get(email=email_or_username)
                attrs["username"] = user.username
            except User.DoesNotExist:
                raise exceptions.AuthenticationFailed("No account found with this email")

        # If they provided username, just proceed (super will authenticate)
        return super().validate(attrs)


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer
