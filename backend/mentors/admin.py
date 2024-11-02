from django.contrib import admin

from .models import mentors, mentorStandard
# Register your models here.
admin.site.register(mentors)
admin.site.register(mentorStandard)