from django.contrib import admin
from questionnaire.models import Questionnaire, Question, Option
from nested_admin import SortableHiddenMixin, NestedStackedInline, NestedModelAdmin


class OptionInline(SortableHiddenMixin, NestedStackedInline):
    model = Option
    fields = ["option_order", "option_text", "image_resource"]
    sortable_field_name = "option_order"


class QuestionInline(SortableHiddenMixin, NestedStackedInline):
    model = Question
    inlines = [OptionInline]
    fields = ["question_order", "question_text"]
    sortable_field_name = "question_order"


class QuestionnaireAdmin(NestedModelAdmin):
    inlines = [QuestionInline]


admin.site.register(Questionnaire, QuestionnaireAdmin)
