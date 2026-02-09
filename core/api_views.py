# core/api_views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.serializers import UserProfileSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard(request):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data)


