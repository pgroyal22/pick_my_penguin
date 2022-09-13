from django.db import models


class QuestionManager(models.Manager):
    def create_question(self, question_text: str):
        question = self.create(question_text=question_text)
        return question
