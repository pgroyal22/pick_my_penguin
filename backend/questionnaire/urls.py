from django.urls import path
from questionnaire import views

urlpatterns = [
    path("questionnaire/", views.QuestionList.as_view()),
]
