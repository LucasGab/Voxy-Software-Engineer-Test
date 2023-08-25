from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from words import views

urlpatterns = [
    path('', views.TextSearchList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
