from rest_framework.serializers import ModelSerializer
from .models import Option, Question, Response, Selection


class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class OptionSerializer(ModelSerializer):
    class Meta:
        model = Option
        fields = "__all__"


class ResponseSerializer(ModelSerializer):
    class Meta:
        model = Response
        fields = "__all__"


class SelectionSerializer(ModelSerializer):
    class Meta:
        model = Selection
        field = "__all__"
