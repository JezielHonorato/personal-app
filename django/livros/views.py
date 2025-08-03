import os
import markdown2

from rest_framework.decorators import action
from django.db.models import Q
from django.http import FileResponse, Http404
from utils.api_response import success, error, CustomModelViewSet

from .models import Pais, Autor, Genero, Livro
from .serializers import (
    PaisSerializer,
    AutorSerializer,
    GeneroSerializer,
    LivroSerializer,
)


class PaisViewSet(CustomModelViewSet):
    queryset = Pais.objects.all().order_by("nome")
    serializer_class = PaisSerializer


class AutorViewSet(CustomModelViewSet):
    queryset = Autor.objects.all().order_by("nome")
    serializer_class = AutorSerializer


class GeneroViewSet(CustomModelViewSet):
    queryset = Genero.objects.all().order_by("nome")
    serializer_class = GeneroSerializer


class LivroViewSet(CustomModelViewSet):
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

    @action(detail=True, methods=["get"], url_path="conteudo")
    def conteudo(self, request, pk=None):
        livro = self.get_object()

        if not livro.arquivo:
            return error(
                message="Este livro não possui um arquivo associado.", code=404
            )

        filepath = livro.arquivo.path
        filename = os.path.basename(filepath)

        try:
            if filename.endswith(".txt"):
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                return success({"type": "txt", "content": content})

            elif filename.endswith(".md"):
                with open(filepath, "r", encoding="utf-8") as f:
                    html_content = markdown2.markdown(
                        f.read(), extras=["nl2br", "header-ids", "footnotes"]
                    )
                return success({"type": "md", "content_html": html_content})

            elif filename.endswith(".pdf"):
                download_url = request.build_absolute_uri(f"../download/")
                return success({"type": "pdf", "url": download_url})

            else:
                return error(message="Formato de arquivo não suportado", code=400)

        except FileNotFoundError:
            return error(message="Arquivo não encontrado no servidor.", code=404)
        except Exception as e:
            return error(
                message="Erro interno do servidor ao processar arquivo.",
                exception=e,
                code=500,
            )

    @action(detail=True, methods=["get"], url_path="download")
    def download(self, request, pk=None):
        try:
            livro = self.get_object()
            if not livro.arquivo:
                raise Http404("Arquivo não encontrado para este livro.")

            filepath = livro.arquivo.path

            if os.path.exists(filepath) and filepath.endswith(".pdf"):
                return FileResponse(
                    open(filepath, "rb"), content_type="application/pdf"
                )
            else:
                raise Http404("O arquivo não é um PDF ou não foi encontrado.")
        except Http404 as e:
            return error(message=str(e), code=404)
        except Exception as e:
            return error(
                message="Erro ao tentar baixar o arquivo.", exception=e, code=500
            )
