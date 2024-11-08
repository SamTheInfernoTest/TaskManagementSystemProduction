from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Student

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    data = request.data
    uid = data['uid']
    password = data['password']
    try:
        user = Student.objects.get(uid = uid)
        if user.password == password:
            name = user.name
            profileImage =  user.profile_image.url if user.profile_image else None
            standards = user.standards.values_list('std', flat=True)
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
    except  Student.DoesNotExist:
        return Response({'message':"User does not exist"},status=status.HTTP_404_NOT_FOUND)
            

