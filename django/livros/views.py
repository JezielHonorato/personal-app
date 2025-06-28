from rest_framework import viewsets
from django.db.models import Q
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

    def get_queryset(self):
        queryset = super().get_queryset()

        search_query = self.request.query_params.get("nome", "").strip()
        genero = self.request.query_params.get("genero", "").strip()
        pais = self.request.query_params.get("pais", "").strip()
        ano_publicacao_min = self.request.query_params.get("ano_min", "").strip()
        ano_publicacao_max = self.request.query_params.get("ano_max", "").strip()
        lido_str = self.request.query_params.get("lido", "").strip().lower()

        if search_query:
            queryset = queryset.filter(
                Q(titulo__icontains=search_query)
                | Q(titulo_original__icontains=search_query)
                | Q(autor__nome__icontains=search_query)
            )

        if genero:
            try:
                genero_id = int(genero)
                queryset = queryset.filter(genero_id=genero_id)
            except ValueError:
                pass

        if pais:
            try:
                pais_id = int(pais)
                queryset = queryset.filter(autor__pais_id=pais_id)
            except ValueError:
                pass

        if ano_publicacao_min:
            try:
                ano_min_int = int(ano_publicacao_min)
                queryset = queryset.filter(ano_publicacao__gte=ano_min_int)
            except ValueError:
                pass

        if ano_publicacao_max:
            try:
                ano_max_int = int(ano_publicacao_max)
                queryset = queryset.filter(ano_publicacao__lte=ano_max_int)
            except ValueError:
                pass

        if lido_str in ["true", "1"]:
            queryset = queryset.filter(lido=True)
        elif lido_str in ["false", "0"]:
            queryset = queryset.filter(lido=False)

        return queryset
