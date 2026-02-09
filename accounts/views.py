# accounts/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .serializers import RegisterSerializer
from .models import User

# -------------------- Signup --------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def signup(request):
    """
    Registers a new user and returns JWT tokens + username
    """
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username,       # ✅ send username
                "firstName": user.username,      # optional, for greeting
                "fullName": user.username
            }
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# -------------------- Dashboard --------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard(request):
    user = request.user
    return Response({
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "firstName": user.username,   # optional
        "fullName": user.username
    })

# -------------------- JWT Login --------------------
class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = "email"

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['username'] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({
            "user": {
                "id": self.user.id,
                "email": self.user.email,
                "username": self.user.username,
                "firstName": self.user.username,
                "fullName": self.user.username
            }
        })
        return data

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    view = EmailTokenObtainPairView.as_view()
    return view(request._request)

# -------------------- Profile --------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    return Response({
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "firstName": user.username,  # or first_name if you have it
        "fullName": user.username    # or full_name if you have it
    })