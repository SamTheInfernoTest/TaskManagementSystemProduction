from django.contrib.auth.backends import BaseBackend

from students.models import Student
from mentors.models import Mentor

class StudentsBackend(BaseBackend):

    def authentication (self, request , uid = None, password = None):
        try:
            user = Student.objects.get(uid = uid)
            if user.password == password:
                return user
        except  Student.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return students.objects.get(pk=user_id)
        except students.DoesNotExist:
            return None


class MentorsBackend(BaseBackend):

    def authentication (self, request , uid = None, password = None):
        try:
            user = Mentor.objects.get(uid = uid)
            if user.password == password:
                return user
        except  Mentor.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return mentors.objects.get(pk=user_id)
        except mentors.DoesNotExist:
            return None