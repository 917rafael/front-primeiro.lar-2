# TODO: Implementar verificação de senha via API no login

- [x] Remover código desnecessário: onMounted que busca usuários (não usado no login)
- [x] Modificar função login(): substituir verificação hardcoded por requisição POST à API (/login)
- [x] Adicionar tratamento de erro: try/catch para capturar erros da API
- [x] Em sucesso: definir sucesso.value e limpar campos email/senha
- [x] Em erro: definir erro.value com mensagem apropriada
- [x] Servidor de desenvolvimento iniciado (http://localhost:5174/)
- [ ] Testar o login após mudanças (navegador não disponível, testar manualmente)
