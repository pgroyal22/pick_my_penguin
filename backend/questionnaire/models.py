from django.db import models
from django.conf import settings
from .model_managers import QuestionManager


class Questionniare(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    started = models.DateTimeField(auto_now=True)
    ended = models.DateTimeField(null=True)

    @property
    def is_completed(self) -> bool:
        return self.started is not None


class Question(models.Model):
    questionnaire = models.ForeignKey(Questionniare)
    question_text = models.TextField(max_length=200)
    objects = QuestionManager()


class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    option_text = models.TextField(max_length=200)
    image_resource = models.ImageField(blank=True)
