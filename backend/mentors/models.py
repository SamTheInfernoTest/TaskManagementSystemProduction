from django.db import models

from institute.models import standards

# Create your models here.
class mentors(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=20)
    createdDate = models.DateTimeField(auto_now_add=True)
    lastActive = models.DateTimeField(auto_now=True)
    profileImage = models.FileField(upload_to='mentors/profileImages',default=None, null=True)

    def __str__(self):
        return self.name

class mentorStandard(models.Model):
    mentor = models.ForeignKey(mentors, on_delete=models.SET_NULL, null=True)
    standard = models.ForeignKey(standards, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.mentor.name} - {self.standard.standard}"