from django.db import models

# Create your models here.
class TextSearch(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField()
    wordsQtd = models.IntegerField()

    class Meta:
        ordering = ['created']
    
    def __str__(self):
        return str(self.id)