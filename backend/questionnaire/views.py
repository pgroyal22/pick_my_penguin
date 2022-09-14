from rest_framework import generics, mixins
from questionnaire.models import Question, Questionnaire
from questionnaire.serializers import QuestionnaireSerializer


class QuestionnaireList(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
