# livros/utils.py
import traceback
import sys
from django.conf import settings

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.mixins import (
    CreateModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
)


def success(data=None, code=200):
    return Response(data, status=code)


def error(message="Falha na requisição", code=400, errors=None, exception=None):
    response = {"message": message}

    if errors:
        response.setdefault("errors", {})["details"] = errors

    if exception:
        error_details = response.setdefault("errors", {})
        error_details["internal_message"] = str(exception)

        if settings.DEBUG:
            exc_type, exc_value, exc_tb = sys.exc_info()

            if exc_tb:
                trace_list = traceback.extract_tb(exc_tb)
                error_details["trace"] = [
                    {
                        "file": t.filename,
                        "line": t.lineno,
                        "function": t.name,
                        "code": t.line,
                        "class": None,
                        "type": None,
                    }
                    for t in trace_list[:5]
                ]
            else:
                error_details["trace"] = (
                    "No traceback available for this exception context."
                )

    return Response(response, status=code)


class CustomModelViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    viewsets.GenericViewSet,
):
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return success(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return success(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return success(serializer.data, code=status.HTTP_201_CREATED)
        return error(
            message="Erro de validação",
            errors=serializer.errors,
            code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)
            return success(serializer.data)
        return error(
            message="Erro de validação",
            errors=serializer.errors,
            code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return success(None, code=status.HTTP_204_NO_CONTENT)

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()
