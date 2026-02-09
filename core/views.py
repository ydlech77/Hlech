from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from accounts.models import User  # Use your custom User model


# -------------------- Forgot Password --------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def forgot_password(request):
    """
    Sends a password reset email with a token link.
    """
    email = request.data.get("email")
    if not email:
        return Response({"error": "Email required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
        token = default_token_generator.make_token(user)
        reset_link = f"http://localhost:3000/reset-password/{user.pk}/{token}"

        send_mail(
            subject="Reset your password",
            message=f"Click here to reset your password: {reset_link}",
            from_email="no-reply@hlech.com",
            recipient_list=[email],
            fail_silently=False,
        )
        return Response({"message": "Password reset email sent"}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


# -------------------- Reset Password --------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def reset_password(request, uid, token):
    """
    Resets the user's password using the token sent via email.
    """
    password = request.data.get("password")
    if not password:
        return Response({"error": "Password required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(pk=uid)
        if default_token_generator.check_token(user, token):
            user.password = make_password(password)
            user.save()
            return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


# -------------------- Dashboard API (core) --------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard_api(request):
    """
    Optional alternative dashboard endpoint from core app.
    Returns a simple welcome message.
    """
    user = request.user
    return Response({
        "message": f"Welcome to Hlech dashboard, {user.full_name} 🚀",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name
        }
    }, status=status.HTTP_200_OK)
