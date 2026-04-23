from django.contrib import admin
from django.urls import path
from quiz import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.cadastro, name='cadastro'),
    path('desafio/', views.desafio, name='desafio'),
    path('ranking/', views.ranking_view, name='ranking'),
    path('api/ranking/', views.api_ranking, name='api_ranking'),
    path('salvar-resultado/', views.salvar_resultado, name='salvar_resultado'),
    path('dificuldade/', views.dificuldade, name='dificuldade'),
]