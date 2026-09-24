# Estrutura de imagens

Coloque suas imagens nas pastas abaixo. Todas as imagens devem ser referenciadas localmente (sem URLs externas).

## Pastas

```
src/assets/
├── images/
│   ├── logo/          → logotipos e marcas institucionais
│   ├── institucional/ → fotos institucionais, fotos de equipe, ambientes
│   ├── secoes/        → imagens usadas dentro de cada seção do conteúdo
│   └── backgrounds/   → imagens de fundo para cabeçalho, heros e blocos
└── icons/             → ícones personalizados (SVG, PNG)
```

## Como usar no código

Importe a imagem no topo do arquivo e use no JSX:

```tsx
import logoUrl from '@/assets/images/logo/logo.png';

<img src={logoUrl} alt="Logo do Complexo de Saúde" />
```

Para imagens de fundo (CSS), importe e aplique via style:

```tsx
import bgUrl from '@/assets/images/backgrounds/hero.png';

<div style={{ backgroundImage: `url(${bgUrl})` }} />
```

## Regras

- Nunca utilize URLs externas ou bancos de imagens de terceiros.
- Sempre adicione `alt` descritivo para acessibilidade.
- Use `object-fit: cover` ou `contain` quando a imagem precisar manter proporção.
- Formatos recomendados: WebP ou PNG para fotos, SVG para ícones e logotipos.
