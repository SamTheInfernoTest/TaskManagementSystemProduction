from django.contrib import admin

from .models import Task, TaskSubmission
# Register your models here.
admin.site.register(Task)
admin.site.register(TaskSubmission)