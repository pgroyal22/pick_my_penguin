from django.test import TestCase
from .serializers import QuestionSerializer
from questionnaire.models import Question, Option, Response, Selection
from user.models import PenguinUser


class SerializerTests(TestCase):
    def setUp(self):
        self.question = Question.objects.create_question(
            question_text="What kind of operating system do you prefer?"
        )
        self.user: PenguinUser = PenguinUser.objects.create_user(
            "philippe", "example@example.com"
        )

    def test_question_serializer(self):
        data = QuestionSerializer(self.question).data
        self.assertJSONEqual()
