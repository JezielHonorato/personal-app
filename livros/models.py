from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Pais(models.Model):
    nome = models.CharField(max_length=100, unique=True, verbose_name="Nome do País")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "País"
        verbose_name_plural = "Países"
        ordering = ['nome']
        
class Autor(models.Model):
    nome = models.CharField(max_length=255, verbose_name="Nome")
    data_nascimento = models.DateField(blank=True, null=True, verbose_name="Nascimento")
    data_morte = models.DateField(blank=True, null=True, verbose_name="Falecimento")
    pais = models.ForeignKey(Pais, on_delete=models.SET_NULL, blank=True, null=True, related_name='autores', verbose_name="País de Origem")
    
    def __str__(self):
        return self.nome

    class Meta:
        verbose_name = "Autor"
        verbose_name_plural = "Autores"
        ordering = ['nome']
