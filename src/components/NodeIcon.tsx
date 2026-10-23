/**
 * Ícones circulares de linhas com nós (ref. "Brand Icons" / NETLines).
 * Cada variante é um padrão de conexão diferente dentro de um círculo.
 */
const patterns: { lines: number[][]; nodes: number[][] }[] = [
  // 0 conectar: caminho sinuoso
  { lines: [[14, 30, 22, 22], [22, 22, 30, 28], [30, 28, 38, 18]], nodes: [[14, 30], [22, 22], [30, 28], [38, 18]] },
  // 1 rede: triângulo com centro
  { lines: [[26, 12, 14, 34], [14, 34, 38, 34], [38, 34, 26, 12], [26, 12, 26, 26], [14, 34, 26, 26], [38, 34, 26, 26]], nodes: [[26, 12], [14, 34], [38, 34], [26, 26]] },
  // 2 velocidade: linhas paralelas
  { lines: [[10, 18, 42, 18], [10, 26, 42, 26], [10, 34, 42, 34]], nodes: [[20, 18], [34, 26], [26, 34]] },
  // 3 casa/roteador: quadrado com diagonais
  { lines: [[15, 15, 37, 15], [37, 15, 37, 37], [37, 37, 15, 37], [15, 37, 15, 15], [15, 15, 37, 37], [37, 15, 15, 37]], nodes: [[15, 15], [37, 15], [37, 37], [15, 37]] },
  // 4 suporte: raios a partir do centro
  { lines: [[26, 26, 26, 8], [26, 26, 44, 26], [26, 26, 26, 44], [26, 26, 8, 26]], nodes: [[26, 26], [26, 12], [40, 26], [26, 40], [12, 26]] },
  // 5 crescimento: dois pontos ligados em diagonal
  { lines: [[14, 36, 26, 26], [26, 26, 38, 16]], nodes: [[14, 36], [26, 26], [38, 16]] },
];

export default function NodeIcon({ variant, className = "" }: { variant: number; className?: string }) {
  const p = patterns[variant % patterns.length];
  return (
    <svg viewBox="0 0 52 52" fill="none" className={className} aria-hidden="true">
      <circle cx="26" cy="26" r="22" stroke="currentColor" strokeWidth="1.6" />
      {p.lines.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      ))}
      {p.nodes.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="currentColor" />
      ))}
    </svg>
  );
}
