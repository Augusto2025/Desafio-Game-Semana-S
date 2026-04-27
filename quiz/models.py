from django.db import models

class Ranking(models.Model):
    nome = models.CharField(max_length=100)
    acertos = models.IntegerField()
    tempo_ms = models.IntegerField()  # Guardamos em milissegundos
    tempo_texto = models.CharField(max_length=20)
    data_registro = models.DateTimeField(auto_now=True)
    nivel = models.CharField(max_length=10, default='facil')

    class Meta:
        ordering = ['-acertos', 'tempo_ms'] # Ordenação padrão: mais acertos, menor tempo

    def __str__(self):
        return f"{self.nome} - {self.acertos}/5"