from rest_framework import serializers
from words.models import TextSearch

class TextSerchSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextSearch
        fields = ['id', 'text', 'wordsQtd']
        read_only_fields = ['wordsQtd']
    
    def create(self, validated_data):
        dataCopy = validated_data.copy()
        dataCopy["wordsQtd"] = len(dataCopy['text'].split())
        return super().create(dataCopy)