from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import json

from .models import standards

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getStandards(request):
    Standards = standards.objects.all()
    return Response(list(Standards.values()))