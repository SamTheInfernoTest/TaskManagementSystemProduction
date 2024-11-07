from django.db import models 
from institute.models import Standard

class Student(models.Model):
    name = models.CharField(max_length=255)
    uid = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=200)  
    created_date = models.DateTimeField(auto_now_add=True)
    last_active = models.DateTimeField(auto_now=True)
    profile_image = models.FileField(upload_to='students/profileImages', null=True, blank=True)

    standards = models.ManyToManyField(Standard, related_name="students")

    def __str__(self):
        return self.name
