from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Task

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def studentGetTasks(request, standard):
    tasks = Task.objects.filter(assignees=standard)
    print(list(tasks.values()))
    return Response(list(tasks.values()))