# Instala as dependências do Python
pip install -r requirements.txt

# Coleta arquivos estáticos (CSS/JS) para a pasta que o WhiteNoise vai ler
python3.9 manage.py collectstatic --noinput --clear

# Aplica as migrações do banco de dados (Cria as tabelas do Ranking)
python3.9 manage.py migrate