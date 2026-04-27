from django.shortcuts import render
from django.http import JsonResponse
from .models import Ranking
import json
import random

def cadastro(request):
    # Sempre que entrar no cadastro, geramos um novo código de 5 dígitos
    codigo_secreto = f"{random.randint(0, 99999):05d}"
    request.session['codigo_secreto'] = codigo_secreto
    return render(request, 'cadastro.html')

def dificuldade(request):
    return render(request, 'dificuldade.html')

def desafio(request):
    # Pegamos o código que foi gerado no cadastro
    codigo = request.session.get('codigo_secreto', '00000')
    return render(request, 'desafio.html', {'codigo_secreto': codigo})

def verificar_cofre(request):
    """ Nova view para validar o código via AJAX ou Form """
    if request.method == 'POST':
        data = json.loads(request.body)
        tentativa = data.get('tentativa')
        codigo_real = request.session.get('codigo_secreto')
        
        if tentativa == codigo_real:
            return JsonResponse({'status': 'desbloqueado', 'premio': 'LINK_OU_CONTEUDO_AQUI'})
        else:
            return JsonResponse({'status': 'erro', 'mensagem': 'Código incorreto!'})

def ranking_view(request):
    return render(request, 'ranking.html')

def desafio(request):
    nivel = request.GET.get('nivel')
    codigo = request.session.get('codigo_secreto', '00000')
    
    return render(request, 'desafio.html', {
        'nivel': nivel, 
        'codigo_secreto': codigo
    })

def api_ranking(request):
    def get_top(nivel):
        top = Ranking.objects.filter(nivel=nivel)[:10]
        return list(top.values('nome', 'acertos', 'tempo_texto'))

    data = {
        'facil': get_top('facil'),
        'medio': get_top('medio'),
        'dificil': get_top('dificil'),
    }
    return JsonResponse(data)

def salvar_resultado(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        Ranking.objects.update_or_create(
            nome=data['nome'],
            nivel=data.get('nivel', 'facil'), # Salva o nível vindo do JS
            defaults={
                'acertos': data['acertos'],
                'tempo_ms': data['tempo'],
                'tempo_texto': data['tempoTexto']
            }
        )
        return JsonResponse({'status': 'sucesso'})
    
def desbloquear_cofre(request):
    codigo_real = request.session.get('codigo_secreto', '00000')
    print(f"Código real para desbloquear o cofre: {codigo_real}")  # Log para debug
    
    if request.method == 'POST':
        # Pega os dados do formulário
        data = json.loads(request.body)
        tentativa = data.get('tentativa')

        if tentativa == codigo_real:
            return JsonResponse({'status': 'sucesso', 'mensagem': 'Acesso Autorizado!'})
        else:
            return JsonResponse({'status': 'erro', 'mensagem': 'Código Inválido!'})

    return render(request, 'cofre.html')

def api_premio(request):
    return render(request, 'premio.html')