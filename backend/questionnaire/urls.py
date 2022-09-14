from django.urls import path
from questionnaire import views

urlpatterns = [
    path("questionnaire/", views.QuestionnaireList.as_view()),
]
