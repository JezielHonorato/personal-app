from rest_framework.routers import DefaultRouter
from .views import PaisViewSet, AutorViewSet, GeneroViewSet, LivroViewSet

router = DefaultRouter()
router.register(r"paises", PaisViewSet)
router.register(r"autores", AutorViewSet)
router.register(r"generos", GeneroViewSet)
router.register(r"livros", LivroViewSet)

urlpatterns = router.urls
