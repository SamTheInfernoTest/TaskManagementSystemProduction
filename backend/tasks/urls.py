from django.urls import path

from . import views

urlpatterns = [
    path('byStudent/<str:standard>/',views.studentGetTasks , name='studentGetTasks'),
    path('submitTask/',views.studentSubmitTask , name='studentSubmitTask'),
]