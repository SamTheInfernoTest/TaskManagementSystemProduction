from django.db import models

# Create your models here.
class standards(models.Model):
    standard = models.CharField(max_length=50)

    def __str__(self):
        return self.standard 