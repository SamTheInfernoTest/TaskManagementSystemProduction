from django.urls import path

from . import views

urlpatterns = [
    path('standards/', views.getStandards , name='getStandards'),
]