from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


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
    data_nascimento = models.DateField(
        blank=True,
        null=True,
        verbose_name="Nascimento",
    )
    data_obito = models.DateField(
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
    )

    STATUS_CHOICES = [
        ("Lido", "Lido"),
        ("Lendo Agora", "Lendo Agora"),
        ("Quero Ler", "Quero Ler"),
        ("Abandonado", "Abandonado"),
    ]
    status = models.CharField(
        max_length=15,
        choices=STATUS_CHOICES,
        default="Quero Ler",
        verbose_name="Status de Leitura",
    )
    avaliacao = models.IntegerField(
        choices=[(i, str(i)) for i in range(1, 6)],
        blank=True,
        null=True,
        verbose_name="Sua Avaliação",
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    data_inicio = models.DateField(
        blank=True,
        null=True,
        verbose_name="Data de Início da Leitura",
    )
    data_fim = models.DateField(
        blank=True,
        null=True,
        verbose_name="Data de Conclusão",
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

    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.titulo} por {self.autor.nome if self.autor else 'Autor Desconhecido'}"

    class Meta:
        verbose_name = "Livro"
        verbose_name_plural = "Livros"
        ordering = ["titulo"]
