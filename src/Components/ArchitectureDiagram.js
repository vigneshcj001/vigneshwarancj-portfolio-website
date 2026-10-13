export default function ArchitectureDiagram({ nodes = [] }) {
  if (!nodes.length) return null;
  return (
    <div className="architecture-diagram" role="img" aria-label={nodes.map((node) => node.label).join(" to ")}>
      {nodes.map((node, index) => (
        <div className="architecture-node-wrap" key={node.label}>
          <div className="architecture-node">
            <strong>{node.label}</strong>
            <span>{node.detail}</span>
          </div>
          {index < nodes.length - 1 && <span className="architecture-arrow" aria-hidden="true">→</span>}
        </div>
      ))}
    </div>
  );
}
