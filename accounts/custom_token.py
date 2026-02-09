# accounts/custom_token.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth.models import User

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email   # include email in the token payload
        return token

    def validate(self, attrs):
        email = attrs.get("username")  # frontend still sends "username" field
        password = attrs.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("No user with this email")

        if not user.check_password(password):
            raise serializers.ValidationError("Incorrect password")

        attrs['username'] = user.username  # map email → username for JWT
        return super().validate(attrs)
