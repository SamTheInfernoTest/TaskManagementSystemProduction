from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.login , name='loginStudent'),
    path('refresh/', views.refresh , name='refreshStudent'),
]