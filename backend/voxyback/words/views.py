from rest_framework import status
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import generics
from rest_framework import filters
from words.models import TextSearch
from words.serializers import TextSerchSerializer

class TextSearchList(generics.DestroyAPIView,generics.ListCreateAPIView):
    """
    List all texts searchs, or create a new text search.
    """
    queryset = TextSearch.objects.all()
    serializer_class = TextSerchSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created']
    ordering = ['created']

    def destroy(self, request, *args, **kwargs):
        TextSearch.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
