from django.contrib import admin
from words.models import TextSearch

class TextSearchAdmin(admin.ModelAdmin):
    readonly_fields = ["created"]

# Register your models here.
admin.site.register(TextSearch, TextSearchAdmin)
