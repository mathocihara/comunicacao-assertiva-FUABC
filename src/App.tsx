import { useState, type ReactNode } from 'react';
import { ArrowRight, ChevronDown, Cross, HeartPulse, ShieldCheck } from 'lucide-react';
import complexoLogo from '@/assets/images/logo/complexo_scs-removebg-preview.png';
import pmscsLogo from '@/assets/images/logo/logo-pmscs-2023.png';

type Example = { wrong: string; right: string };
type Tool = { name: string; summary: string; detail: string };

const nonviolentExamples: Example[] = [
  { wrong: 'Vocês mandaram o paciente errado de novo.', right: 'Podemos conferir juntos o critério de encaminhamento para evitar esse tipo de situação?' },
  { wrong: 'Esse paciente não era para estar aqui.', right: 'Esse paciente parece pertencer a outro fluxo. Vamos verificar o encaminhamento?' },
  { wrong: 'Já falei mil vezes como faz.', right: 'Acho importante alinharmos novamente esse processo para evitar dúvidas.' },
  { wrong: 'A recepção sempre faz isso.', right: 'Percebi que essa situação tem acontecido com frequência. Podemos revisar o fluxo?' },
  { wrong: 'Não é problema meu.', right: 'Posso orientar quem é o setor responsável por essa demanda.' },
  { wrong: 'Vocês precisam prestar atenção.', right: 'Precisamos reforçar essa etapa da conferência para evitar retrabalho.' },
  { wrong: 'Não tenho tempo agora.', right: 'Neste momento estou em atendimento. Assim que finalizar, consigo ajudar.' },
  { wrong: 'O paciente está aí porque vocês demoraram.', right: 'O paciente está aguardando há algum tempo. Podemos verificar a prioridade?' },
  { wrong: 'Não manda mais paciente sem avisar.', right: 'Quando possível, nos avisem antes do encaminhamento para organizarmos o atendimento.' },
  { wrong: 'Isso está tudo errado.', right: 'Identifiquei alguns pontos que precisamos ajustar neste processo.' },
  { wrong: 'O paciente não para de reclamar.', right: 'O paciente está ansioso e tem feito perguntas. Vamos alinhar uma orientação para ele?' },
  { wrong: 'Você nunca me passa as informações completas!', right: 'Tenho recebido algumas informações incompletas. Isso dificulta a continuidade do processo. Preciso que os dados sejam conferidos antes do envio.' },
  { wrong: 'Se você tivesse feito sua parte, isso não teria acontecido.', right: 'Identificamos que esta etapa não foi concluída e isso impactou o resultado. Precisamos definir a tarefa responsável e o prazo.' },
  { wrong: 'Esse paciente não é prioridade.', right: 'Vamos avaliar juntos a classificação e o fluxo mais adequado para este paciente.' },
  { wrong: 'Ninguém atende esse telefone.', right: 'Tentei contato algumas vezes. Qual é o melhor canal para falar com a equipe?' },
  { wrong: 'A culpa não é minha.', right: 'Vamos entender o que aconteceu para encontrarmos a melhor solução.' },
  { wrong: 'Estou fazendo o trabalho de todo mundo.', right: 'Estou com uma demanda alta. Podemos dividir as responsabilidades?' },
];

const collaboratorExamples: Example[] = [
  { wrong: 'Você nunca escuta o que a equipe fala.', right: 'Gostaria que pudéssemos considerar também a percepção da equipe antes de tomar essa decisão.' },
  { wrong: 'Você só sabe cobrar.', right: 'Percebo muitas cobranças e gostaria de receber também orientações sobre como melhorar.' },
  { wrong: 'Isso é injusto.', right: 'Gostaria de entender quais critérios foram utilizados para essa decisão.' },
  { wrong: 'Você está perseguindo fulano.', right: 'Tenho percebido situações diferentes entre os colaboradores. Podemos conversar sobre os critérios utilizados?' },
  { wrong: 'Você não sabe liderar.', right: 'Tenho algumas percepções sobre a gestão da equipe que gostaria de compartilhar.' },
  { wrong: 'Você manda e a gente tem que obedecer.', right: 'Gostaria de entender o motivo dessa decisão e como ela se relaciona às nossas responsabilidades.' },
  { wrong: 'Não vou fazer.', right: 'Tenho uma dificuldade em realizar esta atividade. Podemos conversar sobre o motivo e as possibilidades?' },
  { wrong: 'Você está me expondo.', right: 'Prefiro que esse tipo de orientação seja conversado individualmente.' },
  { wrong: 'Não aceito você falar comigo desse jeito.', right: 'Gostaria que mantivéssemos uma comunicação respeitosa. Podemos continuar esta conversa de outra maneira?' },
];

const managerExamples: Example[] = [
  { wrong: 'Não vou aceitar esse comportamento.', right: 'Esse comportamento não está de acordo com o padrão esperado. Precisamos conversar sobre o ocorrido.' },
  { wrong: 'Você vai fazer porque eu estou mandando.', right: 'Essa atividade faz parte das responsabilidades da função e precisa ser realizada conforme o procedimento institucional.' },
  { wrong: 'Seu resultado está péssimo.', right: 'O resultado apresentado está abaixo da meta estabelecida. Vamos avaliar as causas e definir um plano de melhoria.' },
  { wrong: 'Você fez errado.', right: 'Identifiquei um erro nesta etapa. Vamos corrigir e alinhar como evitar que aconteça novamente.' },
];

const tools: Tool[] = [
  { name: 'CUS', summary: 'Comunicação de Preocupação', detail: 'Expresse sua preocupação com respeito e segurança: descreva a situação, diga por que ela preocupa e sugira uma ação.' },
  { name: 'Closed Loop', summary: 'Circuito Fechado', detail: 'Solicite, confirme o recebimento, repita a informação, execute e informe a conclusão. Assim, todos acompanham o mesmo ciclo.' },
  { name: 'Escuta Ativa', summary: 'Ouvir com atenção', detail: 'Ouvir com atenção, confirmar, validar e responder. Uma conversa segura começa quando a pessoa percebe que foi compreendida.' },
  { name: 'Comunicação Assertiva', summary: 'Fato → Impacto → Necessidade → Pedido', detail: 'Fale sobre fatos observáveis, explique o impacto, apresente sua necessidade e faça um pedido claro.' },
  { name: 'Foco na Solução', summary: 'Construir soluções juntos', detail: 'Busque entender o problema sem procurar culpados. A pergunta central é: o que podemos fazer agora para melhorar?' },
];

function SectionTitle({ number, children, tone = 'blue' }: { number?: string; children: ReactNode; tone?: 'blue' | 'green' | 'orange' }) {
  return <h2 className={`section-title ${tone}`}>{number && <span>{number}</span>}{children}</h2>;
}

function ExamplePair({ example }: { example: Example }) {
  return (
    <div className="example-pair">
      <div className="example-side wrong"><strong><span aria-hidden="true">×</span> Frase que pode gerar conflito</strong><p>“{example.wrong}”</p></div>
      <ArrowRight className="pair-arrow" aria-hidden="true" />
      <div className="example-side right"><strong><span aria-hidden="true">✓</span> Tradução assertiva</strong><p>“{example.right}”</p></div>
    </div>
  );
}

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`tool-card ${open ? 'is-open' : ''}`}>
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="tool-trigger">
        <span className="tool-number">{index + 1}</span>
        <span className="tool-copy"><strong>{tool.name} <em>— {tool.summary}</em></strong><small>{tool.summary}</small></span>
        <ChevronDown size={20} aria-hidden="true" />
      </button>
      {open && <div className="tool-detail">{tool.detail}</div>}
    </div>
  );
}

function App() {
  return (
    <main>
      <header className="institutional-header">
        <div className="brand-mark">
          <img src={complexoLogo} alt="Logo do Complexo de Saúde de São Caetano do Sul" className="brand-logo" />
          <img src={pmscsLogo} alt="Logo da Prefeitura Municipal de São Caetano do Sul" className="partner-logo" />
        </div>
        <div className="header-partners">
          <span className="sus">SUS <Cross size={18} /></span>
        </div>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <div className="hero-icon"><HeartPulse size={54} /></div>
        <div className="hero-title"><p className="eyebrow">Segurança do paciente</p><h1 id="page-title">Comunicação<br /><span>efetiva</span></h1><p>Comunicar bem é estratégia de <b>segurança do paciente</b></p></div>
        <div className="hero-message">Na Segurança do Paciente, comunicar não é apenas falar. É garantir que a informação certa chegue à pessoa certa, no momento certo, seja compreendida e gere a ação correta.</div>
      </section>

      <div className="page-shell">
        <section className="intro-note"><ShieldCheck size={25} /><p>Uma comunicação clara reduz ruídos, fortalece o trabalho em equipe e protege quem está no centro do cuidado.</p></section>

        <section className="three-tools" aria-labelledby="core-tools-title">
          <h2 id="core-tools-title" className="sr-only">Ferramentas de comunicação estruturada</h2>
          <article className="core-card featured"><SectionTitle number="1">SBAR — Comunicação estruturada</SectionTitle><div className="sbar-list"><div><b>S</b><p><strong>Situação</strong><small>O que está acontecendo agora?</small></p></div><div><b>B</b><p><strong>Background / Contexto</strong><small>Qual é o contexto importante?</small></p></div><div><b>A</b><p><strong>Avaliação</strong><small>O que foi identificado?</small></p></div><div><b>R</b><p><strong>Recomendação</strong><small>O que precisa ser feito?</small></p></div></div><div className="mini-example"><strong>× “Doutor, o paciente não está bem.”</strong><b>✓ SBAR</b><p><b>S:</b> paciente X, leito 12, saturação 88%. <b>B:</b> internado por pneumonia, O₂ 2 L/min. <b>A:</b> após 3 L/min, mantém 89%. <b>R:</b> preciso que avalie agora.</p></div></article>
          <article className="core-card"><SectionTitle number="2">Read-back — Repita para confirmar</SectionTitle><p className="card-lead">Especialmente útil para informações críticas, resultados, medicamentos e orientações.</p><div className="readback"><p><b>Profissional:</b><br />Administrar 5 mg.</p><p><b>Receptor:</b><br />Confirmando: 5 mg?</p><p><b>Profissional:</b><br />Isso, 5 mg.</p></div><strong className="card-conclusion">É uma ferramenta simples para reduzir erros de comunicação.</strong></article>
          <article className="core-card"><SectionTitle number="3">Check-back — Confirme a compreensão</SectionTitle><p className="card-lead">Parecido com o read-back, mas envolve confirmar se a informação foi compreendida e recebida corretamente.</p><div className="check-example"><span>✓</span><div><b>Exemplo:</b><p>“Só para confirmar: o paciente será encaminhado para a sala de observação, correto?”</p></div></div></article>
        </section>

        <section className="tools-section" aria-labelledby="tools-title"><SectionTitle tone="blue">Outras ferramentas importantes</SectionTitle><div className="tools-grid">{tools.map((tool, index) => <ToolCard tool={tool} index={index} key={tool.name} />)}</div></section>

        <section className="nonviolent-section" aria-labelledby="nonviolent-title"><SectionTitle tone="green">Comunicação não violenta — o tradutor da comunicação</SectionTitle><p className="section-intro">A forma como dizemos algo pode abrir espaço para a colaboração ou criar resistência. Troque o julgamento por clareza, respeito e responsabilidade.</p><div className="example-grid">{nonviolentExamples.map((example, index) => <ExamplePair example={example} key={`${example.wrong}-${index}`} />)}</div><div className="green-banner">Comunicar com respeito evita conflitos e protege o paciente.</div></section>

        <section className="bottom-grid">
          <div className="collaborator-section"><SectionTitle tone="blue">Colaborador <span aria-hidden="true">→</span> chefia</SectionTitle><div className="stacked-examples">{collaboratorExamples.map((example, index) => <ExamplePair example={example} key={`${example.wrong}-${index}`} />)}</div></div>
          <div className="manager-section"><SectionTitle tone="orange">Chefia também pode dizer não</SectionTitle><p className="manager-lead">Prevenção ao assédio não significa impedir a chefia de cobrar.</p><div className="stacked-examples">{managerExamples.map((example, index) => <ExamplePair example={example} key={`${example.wrong}-${index}`} />)}</div><div className="orange-banner"><strong>Cobrar é necessário. Humilhar não.</strong><span>Firmeza com respeito gera resultados.</span></div></div>
        </section>

        <footer className="closing"><div><p className="closing-kicker">Comunicação não violenta</p><h2>Não significa falar manso.</h2><p className="closing-kicker">Comunicação assertiva</p><h2>Não significa falar duro.</h2><p className="closing-text">A combinação das duas permite dizer o que precisa ser dito, com clareza, respeito e responsabilidade.</p></div><div className="closing-badge"><div className="badge-cross">+</div><strong>Segurança<br />do paciente</strong><small>Comunicação é cuidado.</small></div></footer>
      </div>
    </main>
  );
}

export default App;
