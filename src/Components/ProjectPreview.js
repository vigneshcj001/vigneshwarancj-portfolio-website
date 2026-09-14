export default function ProjectPreview({ study }) {
  return <div className="project-preview" aria-label={`${study.title} workflow overview`}>
    <div className="preview-top"><span /><span /><span /><strong>{study.title}</strong></div>
    <p className="eyebrow">Workflow overview</p>
    <div className="preview-steps">{study.steps.map((step, i) => <div key={step}><b>0{i + 1}</b><span>{step}</span></div>)}</div>
  </div>;
}
