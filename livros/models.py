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
        