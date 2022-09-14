from rest_framework.serializers import ModelSerializer
from questionnaire.models import Questionnaire, Question, Option


class OptionSerializer(ModelSerializer):
    class Meta:
        model = Option
        fields = "__all__"


class QuestionSerializer(ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ["question_order", "question_text", "options"]


class QuestionnaireSerializer(ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Questionnaire
        fields = ["questions"]
