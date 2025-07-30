from rest_framework import serializers
from .models import Pais, Autor, Genero, Livro


class PaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pais
        fields = ["id", "nome"]


class AutorSerializer(serializers.ModelSerializer):
    pais = PaisSerializer(read_only=True)
    pais_id = serializers.PrimaryKeyRelatedField(
        queryset=Pais.objects.all(), source="pais", write_only=True, required=False
    )

    class Meta:
        model = Autor
        fields = ["id", "nome", "ano_nascimento", "ano_obito", "pais", "pais_id"]


class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = ["id", "nome"]


class LivroSerializer(serializers.ModelSerializer):
    autor = AutorSerializer(read_only=True)
    autor_id = serializers.PrimaryKeyRelatedField(
        queryset=Autor.objects.all(), source="autor", write_only=True, required=False
    )
    genero = GeneroSerializer(read_only=True)
    genero_id = serializers.PrimaryKeyRelatedField(
        queryset=Genero.objects.all(), source="genero", write_only=True, required=False
    )

    class Meta:
        model = Livro
        fields = [
            "id",
            "titulo",
            "titulo_original",
            "ano_publicacao",
            "lido",
            "arquivo",
            "capa",
            "autor",
            "autor_id",
            "genero",
            "genero_id",
        ]
