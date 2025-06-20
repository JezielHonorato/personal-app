from rest_framework import serializers
from .models import Pais, Autor, Genero, Livro


class PaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pais
        fields = "__all__"


class AutorSerializer(serializers.ModelSerializer):
    pais = PaisSerializer(read_only=True)

    class Meta:
        model = Autor
        fields = "__all__"


class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = "__all__"


class LivroSerializer(serializers.ModelSerializer):
    autor = AutorSerializer(read_only=True)
    genero = GeneroSerializer(read_only=True)

    autor_id = serializers.PrimaryKeyRelatedField(
        queryset=Autor.objects.all(),
        source="autor",
        write_only=True,
        allow_null=True,
    )
    genero_id = serializers.PrimaryKeyRelatedField(
        queryset=Genero.objects.all(),
        source="genero",
        write_only=True,
        allow_null=True,
    )

    class Meta:
        model = Livro
        fields = (
            "id",
            "titulo",
            "titulo_original",
            "autor",
            "genero",
            "ano_publicacao",
            "status",
            "avaliacao",
            "data_inicio",
            "data_fim",
            "arquivo",
            "capa",
            "data_criacao",
            "data_atualizacao",
            "autor_id",
            "genero_id",
        )
        read_only_fields = (
            "data_criacao",
            "data_atualizacao",
        )
