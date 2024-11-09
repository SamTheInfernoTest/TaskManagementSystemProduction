from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken, TokenError
from .models import Mentor  # Import your custom model

class MentorAuthentication(BaseAuthentication):

    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        try:
            token_type, token = auth_header.split(' ')
            if token_type.lower() != 'bearer':
                raise AuthenticationFailed('Invalid token type')

            # Validate the access token
            decoded_token = AccessToken(token)
            user_id = decoded_token['user_id']

            # Fetch the user associated with the token
            try:
                user = Mentor.objects.get(id=user_id)
            except Mentor.DoesNotExist:
                raise AuthenticationFailed('User not found')

            # Dynamically add is_authenticated attribute
            user.is_authenticated = True
            
            return (user, None)
        except (ValueError, KeyError):
            raise AuthenticationFailed('Invalid token format') 
        except TokenError:
            raise AuthenticationFailed('Token is invalid or expired')

    def authenticate_header(self, request):
        return 'Bearer'
