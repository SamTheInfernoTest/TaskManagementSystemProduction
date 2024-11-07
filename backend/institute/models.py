from django.db import models

class Standard(models.Model):
    std = models.CharField(max_length=50)

    def __str__(self):
        return self.std
