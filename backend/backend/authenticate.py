from django.contrib.auth.backends import BaseBackend

from students.models import students
from mentors.models import mentors

class StudentsBackend(BaseBackend):

    def authentication (self, request , email = None, password = None):
        try:
            user = students.objects.get(email = email)
            if user.password == password:
                return user
        except  students.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return students.objects.get(pk=user_id)
        except students.DoesNotExist:
            return None


class MentorsBackend(BaseBackend):

    def authentication (self, request , email = None, password = None):
        try:
            user = mentors.objects.get(email = email)
            if user.password == password:
                return user
        except  mentors.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return mentors.objects.get(pk=user_id)
        except mentors.DoesNotExist:
            return None