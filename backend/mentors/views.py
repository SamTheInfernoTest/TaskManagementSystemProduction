from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .models import mentors, mentorStandard

@api_view(['POST'])
def login(request):
    data = request.data
    email = data['username']
    password = data['password']
    try:
        user = mentors.objects.get(email = email)
        if user.password == password:
            name = user.name
            profileImage = user.profileImage
            standards = list(mentorStandard.objects.filter(mentor = user))
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'name': name,
                'profileImage': profileImage,
                'standards': standards
            },status=status.HTTP_200_OK)
        else:
            return Response({'message':"Wrong Password"},status=status.HTTP_401_UNAUTHORIZED)
    except  mentors.DoesNotExist:
        return Response({'message':"User does not exist"},status=status.HTTP_404_NOT_FOUND)
            

@api_view(['POST'])
def refresh(request):
    refresh = RefreshToken(request.data['refresh'])
    return Response({
        'access': str(refresh.access_token)
    },status=status.HTTP_200_OK)