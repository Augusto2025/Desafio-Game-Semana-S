from django.shortcuts import render
from django.http import JsonResponse
from .models import Ranking
import json
import random

def cadastro(request):
    # Busca todos os nomes cadastrados para evitar duplicidade no front-end
    # Usamos .values_list para pegar apenas os nomes e facilitar a vida do JS
    nomes_existentes = Ranking.objects.values_list('nome', flat=True)
    
    # Sempre que entrar no cadastro, geramos um novo código de 5 dígitos
    codigo_secreto = f"{random.randint(0, 99999):05d}"
    request.session['codigo_secreto'] = codigo_secreto
    
    return render(request, 'cadastro.html', {
        'nomes_cadastrados': nomes_existentes
    })

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
            nivel=data.get('nivel', 'facil'), # Crucial: identifica em qual card salvar
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
        try:
            data = json.loads(request.body)
            tentativa = data.get('tentativa')

            if not tentativa or len(tentativa) != 5:
                return JsonResponse({'status': 'erro', 'mensagem': 'Formato inválido!'}, status=400)

            # Se acertou tudo de primeira
            if tentativa == codigo_real:
                return JsonResponse({'status': 'sucesso', 'mensagem': 'Acesso Autorizado!'})
            
            # Se errou, vamos gerar as dicas para cada dígito
            dicas = []
            for i in range(5):
                t_digito = int(tentativa[i])
                r_digito = int(codigo_real[i])

                if t_digito < r_digito:
                    dicas.append("up")    # O número real é maior que a tentativa
                elif t_digito > r_digito:
                    dicas.append("down")  # O número real é menor que a tentativa
                else:
                    dicas.append("ok")    # Acertou o dígito específico

            return JsonResponse({
                'status': 'erro', 
                'mensagem': 'Código Inválido!',
                'dicas': dicas  # Enviando o array de dicas para o JS
            })
            
        except (ValueError, IndexError):
            return JsonResponse({'status': 'erro', 'mensagem': 'Erro ao processar dados!'}, status=400)

    return render(request, 'cofre.html')

def api_premio(request):
    return render(request, 'premio.html')