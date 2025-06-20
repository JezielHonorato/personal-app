# livros/views.py
from rest_framework import viewsets
from .models import Pais, Autor, Genero, Livro
from .serializers import (
    PaisSerializer,
    AutorSerializer,
    GeneroSerializer,
    LivroSerializer,
)


class PaisViewSet(viewsets.ModelViewSet):
    queryset = Pais.objects.all().order_by("nome")
    serializer_class = PaisSerializer


class AutorViewSet(viewsets.ModelViewSet):
    queryset = Autor.objects.all().order_by("nome")
    serializer_class = AutorSerializer


class GeneroViewSet(viewsets.ModelViewSet):
    queryset = Genero.objects.all().order_by("nome")
    serializer_class = GeneroSerializer


class LivroViewSet(viewsets.ModelViewSet):
    queryset = Livro.objects.all().order_by("titulo")
    serializer_class = LivroSerializer
