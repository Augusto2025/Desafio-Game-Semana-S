from django.shortcuts import render
from django.http import JsonResponse
from .models import Ranking
import json

def cadastro(request):
    return render(request, 'cadastro.html')

def desafio(request):
    return render(request, 'quiz/desafio.html')

def ranking_view(request):
    return render(request, 'quiz/ranking.html')

def api_ranking(request):
    # Retorna o Top 5 para a atualização em tempo real
    top_5 = Ranking.objects.all()[:5]
    data = list(top_5.values('nome', 'acertos', 'tempo_texto'))
    return JsonResponse(data, safe=False)

def salvar_resultado(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Lógica de sobrescrever: update_or_create busca pelo nome
        Ranking.objects.update_or_create(
            nome=data['nome'],
            defaults={
                'acertos': data['acertos'],
                'tempo_ms': data['tempo'],
                'tempo_texto': data['tempoTexto']
            }
        )
        return JsonResponse({'status': 'sucesso'})