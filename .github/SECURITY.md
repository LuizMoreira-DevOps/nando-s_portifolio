# Política de Segurança

## Reportando vulnerabilidades

Utilize o recurso Private Vulnerability Reporting
disponibilizado pelo GitHub.

Acesse:

Security > Report a vulnerability

Não publique informações sensíveis em issues públicas.

## Boas práticas

- Não versionar credenciais ou tokens de acesso.
- Não versionar arquivos privados de ambiente.
- Utilizar permissões mínimas nos workflows.
- Revisar atualizações propostas pelo Dependabot.
- Validar alterações antes de realizar merges.
- Revogar imediatamente credenciais comprometidas.

## Integração contínua

As alterações devem passar pelas verificações de
qualidade e segurança aplicáveis.

## Releases

As releases devem utilizar versionamento semântico
e tags protegidas.

Uma versão publicada não deve ser reutilizada
para representar outro commit.

## Publicação

O deploy deve ocorrer exclusivamente pelo workflow
de CD autorizado.

## Privacidade

Informações pessoais e dados sensíveis não devem
ser incluídos no código-fonte, logs ou artefatos.
