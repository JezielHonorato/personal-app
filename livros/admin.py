
from django.contrib import admin
from .models import Autor, Genero, Livro, Pais

@admin.register(Pais)
class PaisAdmin(admin.ModelAdmin):
    list_display = ('nome')
    search_fields = ('nome')
    ordering = ('nome')

@admin.register(Autor)
class AutorAdmin(admin.ModelAdmin):
    list_display = ('nome', 'pais', 'data_nascimento', 'data_obito')
    search_fields = ('nome', 'pais__nome')
    list_filter = ('pais')

@admin.register(Genero)
class GeneroAdmin(admin.ModelAdmin):
    list_display = ('nome')
    search_fields = ('nome')

@admin.register(Livro)
class LivroAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'autor', 'genero', 'status', 'avaliacao', 'ano_publicacao', 'titulo_otiginal')
    list_filter = ('atatus', 'genero', 'ano_publicacao', 'authors')
    search_fields = ('titulo', 'titulo_original')
