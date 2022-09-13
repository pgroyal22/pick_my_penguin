from rest_framework import generics, mixins
from questionnaire.models import Question, Option, Response, Selection
from questionnaire.serializers import (
    QuestionSerializer,
    OptionSerializer,
    ResponseSerializer,
    SelectionSerializer,
)


class QuestionList(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
