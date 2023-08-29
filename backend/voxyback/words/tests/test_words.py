from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse

class WordsTests(APITestCase):
    def test_text_words_qtd(self):
        """
        Ensure we are making the right words count
        """
        testing_data = [
            ('dsadsa', status.HTTP_201_CREATED, 1),
            ('', status.HTTP_400_BAD_REQUEST, 0),
            ('   ', status.HTTP_400_BAD_REQUEST, 0),
            ('Teste Teds-dsa ddsad dfsadwa_dsa', status.HTTP_201_CREATED,2),
            ('hello world !', status.HTTP_201_CREATED, 2),
            ('hello world world', status.HTTP_201_CREATED, 2),
            ('hello Hello World WORLD', status.HTTP_201_CREATED, 2)
        ]

        for data in testing_data:
            data_to_send = {'text': data[0]}
            response = self.client.post('/', data_to_send, format='json')
            self.assertEqual(response.status_code, data[1])
            if(data[1] == status.HTTP_201_CREATED):
                self.assertEqual(response.json()['wordsQtd'], data[2])