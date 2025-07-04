import os
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.core.exceptions import ValidationError
from django.core.files.storage import default_storage


class Pais(models.Model):
    nome = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Nome do País",
    )

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name = "País"
        verbose_name_plural = "Países"
        ordering = ["nome"]


class Autor(models.Model):
    nome = models.CharField(
        max_length=255,
        verbose_name="Nome",
    )
    data_nascimento = models.IntegerField(
        blank=True,
        null=True,
        verbose_name="Nascimento",
    )
    data_obito = models.IntegerField(
        blank=True,
        null=True,
        verbose_name="Falecimento",
    )

    pais = models.ForeignKey(
        Pais,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="autores",
        verbose_name="País de Origem",
    )

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name = "Autor"
        verbose_name_plural = "Autores"
        ordering = ["nome"]


class Genero(models.Model):
    nome = models.CharField(
        max_length=50,
        unique=True,
        verbose_name="Nome do Gênero",
    )

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name = "Gênero"
        verbose_name_plural = "Gêneros"
        ordering = ["nome"]


def validar_ano_publicacao(value):
    ano_atual = timezone.now().year
    if value > ano_atual:
        raise ValidationError(
            f"O ano {value} ainda não existe. O máximo permitido é {ano_atual}."
        )


class Livro(models.Model):
    titulo = models.CharField(
        max_length=255,
        verbose_name="Título",
    )
    titulo_original = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Título Original",
    )
    autor = models.ForeignKey(
        Autor,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="livros_do_autor",
        verbose_name="Autor",
    )
    genero = models.ForeignKey(
        Genero,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="livros_do_genero",
        verbose_name="Gênero",
    )
    ano_publicacao = models.IntegerField(
        blank=True,
        null=True,
        verbose_name="Ano de Publicação",
        validators=[validar_ano_publicacao],
    )
    lido = models.BooleanField(
        default=False,
        verbose_name="Lido",
    )
    arquivo = models.FileField(
        upload_to="file_livros/arquivos/",
        blank=True,
        null=True,
        verbose_name="Arquivo",
    )
    capa = models.ImageField(
        upload_to="file_livros/capas/",
        blank=True,
        null=True,
        verbose_name="Capa do Livro",
    )

    def _gerar_novo_caminho(self, nome_campo_arquivo, subpasta):
        campo_arquivo = getattr(self, nome_campo_arquivo)
        if not campo_arquivo or not self.pk:
            return None
        nome_arquivo_antigo = os.path.basename(campo_arquivo.name)
        extensao = os.path.splitext(nome_arquivo_antigo)[1]
        novo_nome = f"{self.pk}-{slugify(self.titulo)}{extensao}"
        return os.path.join("file_livros", subpasta, novo_nome)

    def _renomear_arquivo_no_storage(self, caminho_antigo, novo_caminho):
        if default_storage.exists(caminho_antigo):
            try:
                arquivo_handle = default_storage.open(caminho_antigo, "rb")
                default_storage.save(novo_caminho, arquivo_handle)
                arquivo_handle.close()
                default_storage.delete(caminho_antigo)
            except Exception as e:
                print(
                    f"Erro ao tentar renomear {caminho_antigo} para {novo_caminho}: {e}"
                )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        campos_para_atualizar = {}

        for nome_campo in ["capa", "arquivo"]:
            campo_atual = getattr(self, nome_campo)
            subpasta = "capas" if nome_campo == "capa" else "arquivos"

            if not campo_atual:
                continue

            caminho_atual_do_arquivo = campo_atual.name
            novo_caminho_ideal = self._gerar_novo_caminho(nome_campo, subpasta)

            if caminho_atual_do_arquivo != novo_caminho_ideal:
                self._renomear_arquivo_no_storage(
                    caminho_atual_do_arquivo, novo_caminho_ideal
                )
                campo_atual.name = novo_caminho_ideal
                campos_para_atualizar[nome_campo] = campo_atual

        if campos_para_atualizar:
            super().save(update_fields=campos_para_atualizar.keys())

    def __str__(self):
        return f"{self.titulo} por {self.autor.nome if self.autor else 'Autor Desconhecido'}"

    class Meta:
        verbose_name = "Livro"
        verbose_name_plural = "Livros"
        ordering = ["titulo"]
