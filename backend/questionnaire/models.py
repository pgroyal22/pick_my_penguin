from django.db import models
from django.conf import settings
from questionnaire.model_managers import QuestionManager


class Questionnaire(models.Model):
    pass


class Question(models.Model):
    questionnaire = models.ForeignKey(
        Questionnaire, related_name="questions", on_delete=models.CASCADE
    )
    question_order = models.IntegerField()
    question_text = models.TextField(max_length=200)
    objects = QuestionManager()

    class Meta:
        unique_together = ["questionnaire", "question_order"]
        ordering = ["question_order"]


class Option(models.Model):
    question = models.ForeignKey(
        Question, related_name="options", on_delete=models.CASCADE
    )
    option_order = models.IntegerField()
    option_text = models.TextField(max_length=200)
    image_resource = models.ImageField(blank=True)

    class Meta:
        unique_together = ["question", "option_order"]
        ordering = ["option_order"]
