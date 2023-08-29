import re
from rest_framework import serializers
from words.models import TextSearch

class TextSerchSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextSearch
        fields = ['id', 'text', 'wordsQtd']
        read_only_fields = ['wordsQtd']

    def clean_text(self, text):
        return str(text).lower()

    def filter_special_chars(self, text):
        return re.match('^[a-zA-Z0-9]*$',text)
    
    def create(self, validated_data):
        dataCopy = validated_data.copy()
        dataCopy["wordsQtd"] = len(set(map(self.clean_text, filter(self.filter_special_chars,dataCopy['text'].split()))))
        return super().create(dataCopy)