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
        "status",
        "avaliacao",
        "titulo_original",
    )
    list_filter = (
        "status",
        "genero",
        "ano_publicacao",
        "autor",
    )
    search_fields = (
        "titulo",
        "titulo_original",
        "autor__nome",
        "genero__nome",
        "personal_notes",
    )
