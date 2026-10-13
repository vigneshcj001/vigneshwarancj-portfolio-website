import { useState } from "react";
import petIcon from "url:../../images/pocketpet-icon.png";

const taskSteps = [
  "Search web in isolated Chromium profile",
  "Read matching pages and stream progress",
  "Pause before sensitive action",
  "Continue only after human approval",
];

export default function PocketPetDemo() {
  const [mode, setMode] = useState("pet");
  const [step, setStep] = useState(0);
  const [approved, setApproved] = useState(false);

  const advance = () => {
    if (step === 2 && !approved) return;
    setStep((value) => Math.min(value + 1, taskSteps.length - 1));
  };

  return (
    <section className="pocketpet-demo" aria-labelledby="pocketpet-demo-title">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div><p className="eyebrow">Interactive product demo</p><h2 id="pocketpet-demo-title">Companion and guarded agent</h2></div>
        <div className="demo-tabs" role="tablist" aria-label="PocketPet demo mode">
          {[["pet", "Pet"], ["agent", "Agent"]].map(([value, label]) => <button key={value} role="tab" aria-selected={mode === value} onClick={() => setMode(value)}>{label}</button>)}
        </div>
      </div>
      {mode === "pet" ? (
        <div className="pet-stage">
          <img src={petIcon} alt="PocketPet orange cat" className="pet-bounce" width="128" height="128" />
          <div><strong>Desktop companion</strong><p>Follows cursor, plays fetch, supports custom appearances, and gives break reminders without taking keyboard focus.</p></div>
        </div>
      ) : (
        <div className="agent-demo">
          <ol>{taskSteps.map((item, index) => <li key={item} className={index < step ? "done" : index === step ? "active" : ""}><span>{index + 1}</span>{item}</li>)}</ol>
          {step === 2 && !approved && <div className="approval-box" role="alert"><strong>Approval required</strong><p>Agent reached sensitive boundary. User must review before continuation.</p><button className="primary-action" onClick={() => setApproved(true)}>Approve this step</button></div>}
          <div className="flex flex-wrap gap-2 mt-4"><button className="secondary-action" onClick={() => { setStep(0); setApproved(false); }}>Reset</button><button className="primary-action" disabled={step === 2 && !approved} onClick={advance}>Next step</button></div>
        </div>
      )}
    </section>
  );
}
