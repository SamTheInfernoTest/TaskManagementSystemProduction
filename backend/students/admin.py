from django.contrib import admin

from .models import students, studentStandard
# Register your models here.
admin.site.register(students)
admin.site.register(studentStandard)