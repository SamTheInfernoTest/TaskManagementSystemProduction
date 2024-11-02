from django.db import models

from institute.models import standards

# Create your models here.
class students(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=20)
    createdDate = models.DateTimeField(auto_now_add=True)
    lastActive = models.DateTimeField(auto_now=True)
    profileImage = models.FileField(upload_to='students/profileImages',default=None, null=True)
    
 
    def __str__(self):
        return self.name


class studentStandard(models.Model):
    student = models.ForeignKey(students, on_delete=models.SET_NULL, null=True)
    standard = models.ForeignKey(standards, on_delete=models.SET_NULL, null=True)
    createdDate = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.name} - {self.standard.standard}"