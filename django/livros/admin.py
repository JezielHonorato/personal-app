from django.contrib import admin
from .models import Pais, Autor, Genero, Livro


@admin.register(Pais)
class PaisAdmin(admin.ModelAdmin):
    list_display = ("nome",)
    search_fields = ("nome",)
    ordering = ("nome",)


@admin.register(Autor)
class AutorAdmin(admin.ModelAdmin):
    list_display = (
        "nome",
        "pais",
        "data_nascimento",
        "data_obito",
    )
    search_fields = (
        "nome",
        "pais__nome",
    )
    list_filter = ("pais",)


@admin.register(Genero)
class GeneroAdmin(admin.ModelAdmin):
    list_display = ("nome",)
    search_fields = ("nome",)
    ordering = ("nome",)


@admin.register(Livro)
class LivroAdmin(admin.ModelAdmin):
    list_display = (
        "titulo",
        "autor",
        "genero",
        "ano_publicacao",
        "titulo_original",
        "lido",
    )
    list_filter = (
        "titulo",
        "autor",
        "genero",
        "ano_publicacao",
        "lido",
    )
    search_fields = (
        "titulo",
        "titulo_original",
        "autor__nome",
        "genero__nome",
    )
