from django.contrib import admin

from .models import tasks, tasksStudents
# Register your models here.
admin.site.register(tasks)
admin.site.register(tasksStudents)