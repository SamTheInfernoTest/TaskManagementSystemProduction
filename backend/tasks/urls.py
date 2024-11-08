from django.urls import path

from . import views

urlpatterns = [
    path('byStudent/<str:standard>/',views.studentGetTasks , name='studentGetTasks'),
]